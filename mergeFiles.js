
const express = require("express");
const path = require("path");
const fse = require("fs-extra");
const bodyParser = require('body-parser');
var router = express.Router();
const UPLOAD_DIR = path.resolve(__dirname, "target"); // 大文件存储目录
const TARGET_DIR = path.resolve(__dirname, "target/assets"); // 大文件存储目录
router.post('/', async(req, res) => {
  const data = await resolveData(req);
  const filePath = `${TARGET_DIR}/${data.fileName}`;
  await mergeChunkFile(data.fileName, filePath);
});
const resolveData = (req) => 
  new Promise((resolve) => {
    let arr = [];
    let chunk;
    req.on('data', (data) => {
      arr.push(data);
    });
    req.on('end', () => {
      chunk = Buffer.concat(arr);
      resolve(JSON.parse(chunk.toString()));
    });
  }).catch((e) =>{ throw e; });
  const mergeChunkFile  = async (filename, filePath) => {
    const chunkDir = `${UPLOAD_DIR}/${filename}`;
    const chunkPaths = await fse.readdir(chunkDir);
    await fse.writeFile(`${TARGET_DIR}/${filename}`, ''); // 先创建文件，再追加数据
    chunkPaths.forEach((path) => {
      let p = `${chunkDir}/${path}`;
      fse.appendFileSync(filePath, fse.readFileSync(p)); // 追加数据
      fse.unlinkSync(p);
    });
  }
module.exports = router;