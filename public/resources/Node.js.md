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