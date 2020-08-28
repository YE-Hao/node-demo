var fs = require('fs-extra');
var express = require('express');
const multiparty = require("multiparty");
var path = require('path');
var router = express.Router();
const UPLOAD_DIR = path.resolve(__dirname, 'target');
router.post('/',(req, res) => {
  const multer = new multiparty.Form();
  multer.parse(req, async(err, field, files) => {
    if (err) {
      return;
    }
    console.log('===fields',field);

    const [chunk] = files.chunk;
    const [hash] = field.hash;
    const [fileName] = field.fileName;
    const chunDir = `${UPLOAD_DIR}/${fileName}`;
    // 目录不存在创建目录
    if (!fs.existsSync()) {
      await fs.mkdirs(chunDir);
    }
    await fs.move(chunk.path, `${chunDir}/${hash}`);
    res.end('received file chunk!');
  });
});
module.exports = router;