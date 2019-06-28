const express = require('express'); //node express framework
const router = express.Router();

router.get('/',function(request,response){
  response.send('hello test page');
});//app.get '/' end

module.exports = router;
