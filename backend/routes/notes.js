const router = require('express').Router()
const axios = require('axios')
const cv = require('opencv')
const ColorThief = require('colorthief');
const convert = require('color-convert')

var hTriad1
var hTriad2

var isShirtBlack = false
var isShirtWhite = false
var isPantBlack = false
var isPantWhite = false

const testImage = "./routes/bswp.jpg";

// *****************************************************************
// Main
// *****************************************************************
cv.readImage(testImage, function(err, img) {
  if (err) {
    throw err;
  }
  const width = img.width();
  const height = img.height();
  const buffer_w = width/4
  const buffer_h = height/4

  if (width < 1 || height < 1) {
    throw new Error('Image has no size');
  }

  let shirt_crop = img.crop(buffer_w, buffer_h, width-2*buffer_w, height/2-buffer_h)
  shirt_crop.save("./routes/shirt.png");
  
  // Copy image and crop pant region for colour detection
  let pant_crop = img.crop(buffer_w, height/2, width-2*buffer_w, height/2-buffer_h)
  pant_crop.save("./routes/pant.png");

  // Show bounds of cropping
  img.rectangle([1.5*buffer_w, buffer_h], [buffer_w, buffer_h], [0,0,0], 4);
  img.rectangle([buffer_w, 2.5*buffer_h], [buffer_w, buffer_h], [190,210,75], 4);
  img.save("./routes/ROI.png")  
});

ColorThief.getColor('./routes/shirt.png')
.then(color => { 
  triadic(color);
  ColorThief.getColor('./routes/pant.png')
  .then(pantColor => { pantColorCheck(pantColor) })
  .catch(err => { console.log(err) }) 
})
.catch(err => { console.log(err) })


// *****************************************************************

// find the triadic colors
function triadic(color){

  const triadBuff = 10

  var shirtHsv = convert.rgb.hsv(color)
  
  if(shirtHsv[2] <= 17){
    isShirtBlack = true
  }
  
  if(shirtHsv[1] <= 5 && shirtHsv[2] >= 90){
    isShirtWhite = true
  }

  hTriad1= ((shirtHsv[0] + 120) % 360) - triadBuff
  hTriad1 = angularBounding(hTriad1)
  hTriad2 = ((hTriad1 + 120) % 360) + triadBuff
  hTriad2 = angularBounding(hTriad2)
  
}

function pantColorCheck(pantColor){
  var pantHsv = convert.rgb.hsv(pantColor)

  if(pantHsv[2] <= 10){
    isPantBlack = true
  }
  
  if(pantHsv[1] <= 5 && pantHsv[2] >= 90){
    isPantWhite = true
  }
  

  if((isShirtBlack && !isPantBlack) || (isShirtWhite && !isPantWhite)){
    console.log("opposite shirt and pant (MATCH)")
    return true
  }

  if((isPantBlack && !isShirtBlack) || (isPantWhite && !isShirtWhite)){
    console.log("black or white pant (MATCH)")
    return true
  }

  if(hTriad1 <= pantHsv[0] || hTriad2 >= pantHsv[0]){
    console.log("matches within triadic range (MATCH)")
    return true
  }
  
  console.log("NO MATCH")
  return false
}

function angularBounding(number) {
  if(number < 0) {
    return 360 + number
  }
  if(number > 360) {
    return number - 360
  }
  return number
}

module.exports = router
