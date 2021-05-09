const router = require('express').Router()
const axios = require('axios')
const cv = require('opencv')


cv.readImage("./routes/s.png", function(err, img) {
  if (err) {
    throw err;
  }
  const width = img.width();
  console.log("image width is ", img.width())
  const height = img.height();
  console.log("image height is ",img.height())
  const buffer_w = width/10
  const buffer_h = height/20

  if (width < 1 || height < 1) {
    throw new Error('Image has no size');
  }
  // You can try more different parameters

  //dst = src.roi(rect);
  const x = (width - buffer_w)
  console.log("NUBER", x, buffer_w)
  img.rectangle([buffer_w, buffer_h], [width/2, height/2], [0,0,0], 4);
  img.save("./routes/test2.png");
});

module.exports = router