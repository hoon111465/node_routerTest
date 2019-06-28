var http = require('http');
//var fs = require('fs');
var sanitizeHtml = require('sanitize-html'); //보안 라이브러리 모듈
const template = require('./template.js');
var url = require('url');
var qs = require('querystring');
const express = require('express'); //node express framework
const app = express();
const idxRouter = require('./routers/index.js');
const crudRouter = require('./routers/crud.js');
const partRouter = require('./routers/part.js');
const db = require('./dbconfig/db');


app.use('/',idxRouter);
app.use('/page/',crudRouter);
app.use('/part/',partRouter);

app.listen(3000, function(req,res) {
  console.log('app listening on port 3000! start')
});//app.listen end
