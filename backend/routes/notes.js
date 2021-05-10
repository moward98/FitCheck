const router = require('express').Router()
const axios = require('axios')
const cv = require('opencv')
const colourpick = require('dominant-color')


cv.readImage("./routes/s.png", function(err, img) {
  if (err) {
    throw err;
  }
  const width = img.width();
  console.log("image width is ", img.width())
  const height = img.height();
  console.log("image height is ",img.height())
  const buffer_w = width/4
  const buffer_h = height/4

  if (width < 1 || height < 1) {
    throw new Error('Image has no size');
  }
  // You can try more different parameters

  const x = (width - buffer_w)

  // Copy image and crop shirt region for colour detection
  //img.rectangle([buffer_w, buffer_h], [width-2*buffer_w, height/2-buffer_h], [0,0,0], 4);

  let shirt_crop = img.crop(buffer_w, buffer_h, width-2*buffer_w, height/2-buffer_h)
  console.log("mean test shirt", shirt_crop.mean())
  shirt_crop.save("./routes/shirt.png");
  
  // // Copy image and crop pant region for colour detection
  // //img.rectangle([buffer_w, height/2], [width-2*buffer_w, height/2-buffer_h], [190,210,75], 4);
  // let pant_crop = img.crop(buffer_w, height/2, width-2*buffer_w, height/2-buffer_h)
  // console.log("mean test pant", pant_crop.mean())
  // pant_crop.save("./routes/pant.png");

  // // Show bounds of cropping
  // img.rectangle([1.5*buffer_w, buffer_h], [buffer_w, buffer_h], [0,0,0], 4);
  // img.rectangle([buffer_w, 2.5*buffer_h], [buffer_w, buffer_h], [190,210,75], 4);
  // img.save("./routes/ROI.png")

  // Try to get dominant colour
  // colourpick("./routes/shirt.png", {format: 'rgb'}, function(err, colour){
  //   console.log(colour) // ['91', '108', '110']
  // })
  let test = colourpick(shirt_crop)
  console.log(test)
});

module.exports = router