var fs = require('fs');
var filepath = './public/resources/Node.js.md';
// fs.readFile(filepath,'utf8',(err,data)=>{
//     if(err){
//         throw err;
//     }
//     console.log(data);
// })

fs.open(filepath,'r',(err,fd)=>{
    if(err){
        throw err;
    }
    var buf = Buffer.alloc(1024);
    fs.read(fd,buf,0,1024,0,(err,bytesRead,buf)=>{
        if(err){
            throw err;
        }
        console.log(buf.toString('utf8'))
        console.log('length:',bytesRead)
        fs.close(fd);// 关闭文件
    })
})
