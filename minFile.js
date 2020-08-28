var fs = require('fs');
var zlib = require('zlib');
fs.createReadStream(__dirname + '/download/lis.png').pipe(zlib.createGzip()).pipe(fs.createWriteStream(__dirname + '/download/lis.png.zip'));