# Node.js
## 事件驱动编程
### 事件驱动的工作原理
### 闭包
```
(function(){
    // 1. 通过IIFE创建一个函数作用域
    var counter = 0; // IIFE执行完之后就形成了闭包作用域
    document.getElementById('btn').onclick = function(){ // 函数内的函数赋值给全局变量，于是可以访问到counter，并且只要onclick没有被其他值替换，外层的作用域就无法释放，这就是闭包的本质
        counter ++;
        console.log('点击了'+counter+'次');
    }
})()
```
## Node的核心API
### 加载模块
#### 加载核心模块
核心模块以二进制形式发布。
```
var http = require('http');
```
#### 加载文件模块
```
var myModule = require('../home/my_modules/util'); // 查找到util.js
```
#### 加载文件夹模块
文件夹目录：
```
util
    |-- dataFormat
        |-- index.js
        |-- package.json
        |-- other.js
```
package.json
```
{
    "name":"dataFormat",
    "main":"./other.js"
}
```
```
var dataFormat = require('./util/dataFormat');
// 1. 当存在package.json时，优先认为其中main属性指定的文件为主入口
// 2. 若没有package.json，则以index.js为主入口
```
#### 从node_modules中加载模块
加载`node_modules/color.js`：
```
var color = require('color.js');
```
### 缓冲区、二进制数据的编码和解码
#### 什么是缓冲区
Node.js源于JavaScript，而JavaScript只有数值类型和字符串类型，处理二进制数据十分麻烦。因此，设计了`Buffer`类。
Buffer底层以16进制进行存储。
#### 如何创建缓冲区
```
var buf1 = Buffer.alloc(3); // 分配3个字节长度的缓存区，默认以0填充
var buf2 = Buffer.alloc(3,1); // 分配3个字节长度的缓存区，以1填充
var buf3 = Buffer.allocUnsafe(1024); // 快速分配一块1024字节的缓冲区，但是里面包含旧数据
var buf4 = Buffer.from('test');
var buf5 = Buffer.from([1,2,3]);
```
## 异步串行
```
async indexAction(){
    // 现有一组id号，需要顺序更新每个id对应的值
    const resources = [10, 97, 33, 23, 21, 25, 24, 28, 26, 30, 15, 99];
    // 从第0个开始
   await this.updateAmount(0);
}
async updateAmount(index) {
    if (index > resources.length - 1) {
        return;
    }
    const id = resources[index];
    const data = await this.getAmount(id);
    const amount = data[0].amount;
    const affectedRows = await this.setAmount(id, amount);
    console.log(affectedRows);
    await this.updateAmount(index + 1); // 递归
}
```
## HTTP
### 原生Node搭建一个Server
```
const http = require('http');
const server = http.createServer((request,response)=>{
    response.end('Hello World');
});

//设置监听端口号和服务器启动时的回调
server.listen(3000,()=>{
    console.log(server start at port 3000);
})
```
### request(req)对象
`req`这个对象保存着很多信息，在控制台中打印就可以看到。我们常用的信息包括`headers、url、method`。我们可以将它们返回给浏览器。
```
var http = require('http');
var url_tool = require('url');

var server = http.createServer((req, res) => {
    let { headers, url, method } = req;
    //拿到信息稍作处理
    const { query, pathname } = url_tool.parse(url, true);
    const result = {
        headers,
        url: headers.host + url,
        pathname,
        data: {...query },
        method
    };
    // end方法的参数不支持对象，需要转成字符串
    res.end(JSON.stringify(result));
});
server.listen(3001, function () {
    console.log('server start at port 3001')
});

```
返回结果如下：
```
{
    "headers": {
        "host": "localhost:3001",
        "connection": "keep-alive",
        "cache-control": "max-age=0",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36",
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
        "cookie": "_ga=GA1.1.218472273.1548039286"
    },
    "url": "localhost:3001/index?name=abc",
    "pathname": "/index",
    "data": {
        "name": "abc"
    },
    "method": "GET"
}
```
### response(res)对象
`res`对象提供了一些api：
```
    res.statusCode = 200; //设置状态码
    res.setHeader("Content-Type","text/html;charset=utf-8"); //设置响应头
    res.write(string|Buffer);
    res.end();
```
由于`res`对象继承自`Stream`，所以可以用流来输出：
```
const rs = fs.createReadStream(filepath);
rs.pipe(res,{ end:false }); // rs结束不会默认调用end()
rs.on('end',()=>{ // rs出发end事件，我还要做一些其他处理
    res.write('end');
    res.end();
})
```
### 中间件
上面我们搭建一个简单server时，直接将回调函数传入了。
而实际开发中，往往有多个任务，并且添加的时机未确定。这样，就需要能够随时添加任务（中间件）。
#### 实现一个简单的中间件管理器
```
const http = require('http');

function express() {

    const middlewares = []; // 存放中间件的容器
    let i = 0; // 执行游标

    function app(req, res) { // app的作用是：1) 添加中间件 2)执行中间件
        
        function next() {
            const task = middlewares[i]; // 取出一个中间件
            i++; // 游标后移一位
            if (!task) return;
            task(req, res, next);
        }
        next();
    }

    app.use = function (task) {
        // task是一个函数（任务）
        middlewares.push(task);
    }

    return app; // 形成闭包
}

const app = express();

const server = http.createServer(app);

server.listen(3001, function () {
    console.log('server start at port 3001');
});

app.use((req, res, next) => {
    console.log(1);
    res.write('1');
    next();
})
app.use((req, res, next) => {
    console.log(2);
    res.end('2');
    next();
})
```
#### 中间件的小问题
注意到，每次写中间件时，都必须加上第三个参数`next`，并且在适当的时机调用它`next()`。这样的写法总感觉不够优雅，既然每个中间件都有`next`，我们是否可以封装一下呢？
```
app.use((req, res, next) => {
    setTimeout(()=>{
        console.log(1);
        res.write('1');
        next();
    },1000);
})
app.use((req, res, next) => {
    console.log(2);
    res.end('2');
    next();
})
```
##### 尝试封装
```
const http = require('http');

function express() {

    const middlewares = [];
    let i = 0;
    let ctx = {}; // 在闭包的作用域中创建一个对象，用于存放信息
    function app(req, res) { // 这里的req和res用于server的回调，也就是说，这里是跟原生node的http的server对接
        
        ctx.req = req; // 将req和res对象存到ctx上
        ctx.res = res;

        function next() {
            const task = middlewares[i++];
            if (!task) return;
            task(ctx).then(() => next());  // 通过promise，实现异步的串行执行，同时，信息都存放在ctx对象里，挺好
        }
        next();
    }

    app.use = function (task) {
        middlewares.push(task);
    }

    return app;
}

const app = express();

const server = http.createServer(app);

server.listen(3001, function () {
    console.log('server start at port 3001');
});

app.use((ctx) => {
    return new Promise((resolve, reject) => { // 每个中间件返回一个Promise对象
        setTimeout(() => {
            ctx.num = '1';
            resolve(); // 信息也可以通过resolve(info)传参传递，但这里都存到ctx对象显然更好，ctx有点类似状态
        }, 1000);
    });

})
app.use((ctx) => {
    return new Promise((resolve, reject) => {
        ctx.res.end(ctx.num + 1);
        resolve();
    })
})
```