const FILE_LENGTH = 10;
const fileBlob = {
  file: null,
}
(function(){
  const fileDom = document.getElementById('file-blob');
  fileDom.onchange = function(v) {
    console.log(v);
  }
})();
// 生成文件切片
function createFileChunk(file, length = FILE_LENGTH) {
  const fileList = [];
  const fileChunkSize = Math.ceil(file.size / length);
  let curr = 0;
  while (curr < file.size) {
    fileList.push({ file: file.slice(curr, curr + fileChunkSize)});
    curr += fileChunkSize
  }
  return fileList;
}
// 上传切片
async function uploadChunkFile(file) {
  const requestList = createFileChunk(file).map((item) => {

  });
}
module.exports = function () {
  console.log('nihao')
}