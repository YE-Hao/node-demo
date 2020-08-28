var fs = require('fs');
var express = require('express');
var multer = require('multer');
var router = express.Router();
var upload = multer({ dest: 'upload_temp/'});
router.post('/', upload.any(), (req, res, next) => {
  console.log(req.files[0]);  // 上传的文件信息
  var dest = './download/' + req.files[0].originalname;
  fs.readFile(req.files[0].path, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    fs.writeFile(dest, data, (err) => {
      if (err) {
        console.log(err);
      } else {
        var response = {
          message:'File uploaded successfully',
          filename:req.files[0].originalname,
        };
        res.end( JSON.stringify( response ) );
      }
    });
  });
});
module.exports = router;