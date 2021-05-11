const router = require('express').Router()
const axios = require('axios')
const cv = require('opencv')
const ColorThief = require('colorthief');


cv.readImage("./routes/s.png", function(err, img) {
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
  console.log("mean test shirt", shirt_crop.mean())
  shirt_crop.save("./routes/shirt.png");
  
  // Copy image and crop pant region for colour detection
  let pant_crop = img.crop(buffer_w, height/2, width-2*buffer_w, height/2-buffer_h)
  console.log("mean test pant", pant_crop.mean())
  pant_crop.save("./routes/pant.png");

  // Show bounds of cropping
  img.rectangle([1.5*buffer_w, buffer_h], [buffer_w, buffer_h], [0,0,0], 4);
  img.rectangle([buffer_w, 2.5*buffer_h], [buffer_w, buffer_h], [190,210,75], 4);
  img.save("./routes/ROI.png")  
});

ColorThief.getColor('./routes/pant.png')
.then(color => { console.log(color) })
.catch(err => { console.log(err) })

module.exports = router