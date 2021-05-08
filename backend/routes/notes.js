const router = require('express').Router()
const axios = require('axios')

const cv = require('opencv')

cv.readImage("test.png", function(err, img) {
  if (err) {
    throw err;
  }
  console.log("The image is here morrrgan", img);
  const width = img.width();
  console.log("image width is ", img.width())
  const height = img.height();
  console.log("image height is ",img.height())

  if (width < 1 || height < 1) {
    throw new Error('Image has no size');
  }

  // do some cool stuff with img
  

  // save img
  img.save('./img/myNewImage.jpg');
});

module.exports = router