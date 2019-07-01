const express = require('express'); //node express framework
const router = express.Router();

router.get('/',function(req,res){
  res.send('hello test page');
});//app.get '/' end

router.get('/dog',function(req,res){
  res.send('dog page on');
});//app.get '/' end

router.get('/cat',function(req,res){
  res.send('url is cat');
});//app.get '/' end

router.get('/cow',function(req,res){
  res.send('cow cry cry');
});//app.get '/' end

router.get('/mouse',function(req,res){
  res.send('mouse mouse mouse');
});//app.get '/' end

module.exports = router;
