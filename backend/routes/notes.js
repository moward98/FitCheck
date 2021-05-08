const router = require('express').Router()
const axios = require('axios')
const cv = require('opencv')


cv.readImage("./routes/fuck.jpg", function(err, img) {
  if (err) {
    throw err;
  }
  const width = img.width();
  console.log("image width is ", img.width())
  const height = img.height();
  console.log("image height is ",img.height())

  if (width < 1 || height < 1) {
    throw new Error('Image has no size');
  }

  img.detectObject(cv.FACE_CASCADE,{}, function(err, faces){
    if (err) throw err;
    for (var i = 0; i < faces.length; i++){
       var face = faces[i];
       img.ellipse(face.x + face.width / 2, face.y + face.height / 2,    face.width / 2, face.height / 2);
     }
       img.save("./routes/test2.jpg");
     });
});

module.exports = router