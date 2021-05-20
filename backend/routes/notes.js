const router = require('express').Router()
const axios = require('axios')
const cv = require('opencv')
const ColorThief = require('colorthief');
const convert = require('color-convert')


cv.readImage("./routes/allblack.jpg", function(err, img) {
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
.then(color => { triadic(color) })
.catch(err => { console.log(err) })

var hTriad1
var hTriad2

var isShirtBlack = false
var isShirtWhite = false

// find the triadic colors
function triadic(color){

  const triadBuff = 10

  var shirtHsv = convert.rgb.hsv(color)
  console.log("Shirt HSV is", shirtHsv)

  if(shirtHsv[2] <= 10){
    isShirtBlack = true
  }
  
  if(shirtHsv[1] <= 5 && shirtHsv[2] >= 90){
    isShirtWhite = true
  }
 
  hTriad1= ((shirtHsv[0] + 120) % 360) - triadBuff
  console.log("Triad 1 Hue", hTriad1)

  hTriad2 = ((hTriad1 + 120) % 360) + triadBuff
  console.log("Triad 2 Hue", hTriad2)
}

ColorThief.getColor('./routes/pant.png')
.then(pantColor => { pantColorCheck(pantColor) })
.catch(err => { console.log(err) })

function pantColorCheck(pantColor){
  var pantHsv = convert.rgb.hsv(pantColor)
  console.log("Pant HSV is", pantHsv)

  var isPantBlack = false
  var isPantWhite = false

  if(pantHsv[2] <= 10){
    isPantBlack = true
  }
  
  if(pantHsv[1] <= 5 && pantHsv[2] >= 90){
    isPantWhite = true
  }

  console.log(isPantBlack)
  console.log(isShirtBlack)

  console.log(isPantWhite)
  console.log(isShirtWhite)
  

  if((isShirtBlack && !isPantBlack) || (isShirtWhite && !isPantWhite)){
    console.log("opposite shirt and pant")
    return true
  }

  if((isPantBlack && !isShirtBlack) || (isPantWhite && !isShirtWhite)){
    console.log("black or white pant")
    return true
  }

  if(hTriad1 <= pantHsv[0] || hTriad2 >= pantHsv[0]){
    console.log("matches within triadic range")
    return true
  }
  else{
    console.log("no match")
    return false
  }
}

module.exports = router
