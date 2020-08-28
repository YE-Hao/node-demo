var express = require('express');
var fs = require('fs');
var app = express();
var upload = require('./upload');
var uploadChunk = require('./uploadChunk');
var mergeFiles = require('./mergeFiles');
const hostname = '127.0.0.1';
const port = 8999;
const host = hostname + ':' + port;
app.engine('.html', require('ejs').__express);
app.set('view engine', 'ejs');
// app.set('view options', {delimiter: '?'});
app.set('views', __dirname + '/views');
app.set('view options', { layout: false });
app.get('/',(req, res) => {
  // res.render('demo.html');
  var filesArr = [];
  var files = fs.readdirSync(__dirname + '/download');
  files.forEach((i) => {
    var filesObj = {};
    filesObj.name = i;
    filesObj.url = '/download/' + i;
    filesArr.push(filesObj);
  })
  console.log('out-----', filesArr);
  res.render('download', { results: filesArr });
  // res.render('index');
  // res.send('hello world')
});
app.get('/index',(req, res) => {
  res.render('demo.html');
});
app.use('/uploadChunk', uploadChunk);
app.use('/merge', mergeFiles);
app.get('/search', (req, res, next) => {
  var tweets = [{ text: 'demo1', from_user: 'lamns'},{ text: 'demo2', from_user: 'james'},]
  res.render('search',{ results: tweets, search: req.query.q });
});
app.get('/up', (req, res, next) => {
  res.render('upload');
})
app.use('/download', (req, res, next) => {
  console.log(req.url);
  var u = decodeURI(req.url);
  res.download(__dirname + '/download' + u);
});

app.use('/upload', upload);
app.listen(port,hostname, () => {
  console.log(`服务器运行在http://${host}`);
});
