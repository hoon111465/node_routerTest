const express = require('express'); //node express framework
const router = express.Router();
const db = require('../dbconfig/db');
const template = require('../template.js');

router.get('/',function(req,res){
  db.query('SELECT * FROM data_text', function(err, dbData){

    if(err) {
    console.log('err: '+error);
    };//if end

  let list = template.list(dbData);
  const body = '<h2>welcome node world</h2>';
  let html = template.HTML(list, body);
  console.log('select now');
  console.log('test ..................');
  res.send(html);
  });//connection.query end
});//app.get '/' end

module.exports = router;
