const express = require('express'); //node express framework
const router = express.Router();
const db = require('../dbconfig/db');
const template = require('../template.js');

router.get('/',function(request,response){
  db.query('SELECT * FROM data_text', function(error, dbData){

    if(error) {
    console.log('err: '+error);
    };//if end

  let list = template.list(dbData);
  const body = '<h2>welcome </h2>';
  let html = template.HTML(list, body);
  console.log('select now');

  response.send(html);
  });//connection.query end
});//app.get '/' end

module.exports = router;
