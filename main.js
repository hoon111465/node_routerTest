const http = require('http'); //http 통신을 위한 모듈
const express = require('express'); //node express framework
const app = express();
const idxRouter = require('./routers/index.js');
const crudRouter = require('./routers/crud.js');
const partRouter = require('./routers/part.js');

app.use('/',idxRouter);
app.use('/page/',crudRouter);
app.use('/part/',partRouter);

app.listen(3000, function(req,res) {
  console.log('app listening on port 3000! start')
});//app.listen end
