const express = require('express'); //node express framework
const router = express.Router();
const db = require('../dbconfig/db');  //db정보가 저장된 위치에 파일을 읽어 옴
const template = require('../template.js');  // template정보를 위치에서 파일을 읽어 옴
const qs = require('querystring');  //url 객체의 query와 관련된 모듈
const url = require('url'); //url 정보를 객체로 가져와 분석하거나(parse) url 객체를 문자열로 바꿔주는 기능(format, resolve)을 수행

router.get('/insertForm',function(req,res){ //url /page/insertForm의 주소로 이동하면
  console.log('insertForm in');

  //db의 정보를 select 한다
  db.query('SELECT * FROM data_text', function(error, dbData){

    if(error) {                 //error가 있다면
    console.log('err: '+error);
    };//if end

  let list = template.list(dbData); //select한 db정보를 template에 적용시켜 list변수에 저장한다
  //body에 html을 삽입한다
  const body = `<form action="/page/insert" method="post">
                  <p><input type="text" name="title" style="width:200px" placeholder="title을 입력해주세요"/></p>
                  <p><input type="submit"></p>
                </form>`;

  let html = template.HTML(list, body); //template의 HTML메서드에 list, body 변수를 인자로 html변수에 저장한다
  console.log('move insertForm page');

  res.send(html); //http 응답으로 변수 html에 저장한 값을 보낸다
  });//connection.query end

});//app.get '/insertForm' end

router.post('/insert',function(req,res){
  let querys ='';
  req.on('data',function(data){
    querys += data; //querys 변수에 data를 저장
    console.log('data: '+data);
  });//req.on 'data' end

  req.on('end',function(){
    let post = qs.parse(querys);//querystring 모듈을 사용하여 querys값을 post 변수에 저장
    console.log('insertData: '+post.title);
    db.query('INSERT INTO data_text(title) VALUES(?)', post.title, function(error, dbData){ //쿼리가 여러개일 경우 []묶어서 쓰기
      if(error) {
      console.log('err: '+error);
      };//if end
      console.log('insert now');
      res.redirect('/');
    });//connection.query end
  });//req.on 'end' end
});//app.get '/insert' end

router.get('/updateForm',function(req,res){
  let text = url.parse(req.url, true).query;
  //console.log('update_textquery:'+text.no);
  db.query('SELECT * FROM data_text WHERE no='+db.escape(text.no), function(error, dbData){
    if(error) {
    console.log('err: '+error);
    };//if end

    let list = template.list(dbData);
    console.log('updateNo'+dbData[0].no+', updateTitle: '+dbData[0].title);
    let body = '<form action="/page/update" method="post">'+
    '<p><input type="hidden" name="no" value="'+dbData[0].no+'" >'+
    '<input type="text" name="title" placeholder="title" value="'+dbData[0].title+'" /></p>'+
    '<p><input type="submit"></p>'+
    '</form>';
    let html = template.HTML(list, body);

    res.send(html);
  });//connection.query end
});//app.get '/updateForm' end

 router.post('/update',function(req,res){
  let querys ='';

  req.on('data',function(data){
    querys += data;
  });//req.on 'data' end

  req.on('end',function(req,res){
    let post = qs.parse(querys);
    console.log('updateNo:'+post.no+', updateTitle: '+post.title);
    console.log('UPDATE data_text SET title='+post.title+' WHERE no ='+post.no);

    db.query('UPDATE data_text SET title='+db.escape(post.title)+' WHERE no ='+db.escape(post.no)+'', function(error, result){
      if(error) {
      console.log('err: '+error);
      };//if end
      console.log('update now');

    });//db.query end

  });//req.on end
  res.redirect(302, '/');
});//app.post '/update' end

 router.get('/deleteForm',function(req,res){
    console.log('delete page connect');
    var text = url.parse(req.url, true).query;
    console.log('delNo: '+ text.no);
    db.query('DELETE FROM data_text WHERE no='+db.escape(text.no), function(error){
      if(error) {
      console.log('err: '+error);
      };//if end
      console.log('delete now');
    });//db.query end
    console.log('delete page exit');
    res.redirect(302,'/');
  });//app.post '/delete' end

module.exports = router; //모듈화 시킨다
