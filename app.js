const express = require('express');
//const cors = require('cors');
const monggose = require('mongoose');
const port = 3000;
const bodyParser = require('body-parser');
const cookieParser= require('cookie-parser');
const app = express();
//DB연결
const connect = monggose.connect("mongodb://localhost:27017/lighthouse",{
    useNewUrlParser: true, useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));
                

  
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
//json데이터 받기위해
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

// 정적 파일 불러오기(업로드 테스트용)
app.use(express.static(__dirname + "/public"));

// 라우팅 정의
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/tag.html");
});
//route
app.use('/api/posts', require('./routes/post'))

app.listen(port, () => {
    console.log(`Server Listening on ${port}`)
  });