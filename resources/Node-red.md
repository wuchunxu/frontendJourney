# Node-Red
**Node-red教程地址：http://noderedguide.com/**

## 案例
### MQTT接收json
MQTT协议基于（发布/订阅）模式，接收MQTT消息需要地址和topic，信息提供商会向topic推送数据，订阅了某个topic，就会收到该topic的信息。

1. 从左侧输入栏拖出mqtt协议node结点，进行配置。
2. 结点属性包括：服务端、主题（topic）、QoS、输出和名称。
   服务端：首先输入一个名字（其实就是一个变量，指向服务端的一个实例），然后点击编辑按钮配置服务端参数，其实就是输入必要的参数创建连接对象。
   服务端地址：`broker.mqtt-dashboard.com`，端口：`1883`。客户端id自动生成，可以不填。
3. 建立远程连接后，我们还需要指定要接收哪个Topic的消息。
4. 这里，我们先向服务器申请创建一个topic，然后在该topic下发送消息，那么只要配置接收该topic的客户端都会收到所发的消息。打开在线客户端`http://www.hivemq.com/demos/websocket-client/`，用来创建topic，并且发送消息。注意该网站使用了google的cdn资源，由于被墙了，所以该网站不能正常工作。解决办法：1)翻墙；2)chrome浏览器可以安装插件，将谷歌cdn指向中国大陆即可。
5. 连接成功后，在Publish下输入topic和message（输入一个json信息）。
6. 在node-red的mqtt结点属性中找到主题，输入上一步的topic。
7. 点击第5步中publish按钮
8. node-red客户端应该就会收到信息，我们在mqtt结点后加一个function，用来解析json，最后接上一个debug，用来显示输出。
9. 当然，最后要记得点击部署。

### 在function中创建新消息
新建一个对象，将消息存入，返回即可。
```
var newMsg = {payload:'new Message'};
return newMsg;
```
### 在function结点中创建并返回新的消息
**将输出设置成3，再分别定义三个输出口：**
```
if(msg.payload==='high'){
    return [{payload:'高'},null,null];
}else if(msg.payload==='med'){
    return [null,{payload:'中'},null];
}else{
    return [null,null,{payload:'低'}];
}
```
### 调试性功能
```
node.log(); // 在命令行也就是控制台中输出，注意是node.js的console，而不是浏览器
node.warn(); // 控制台输出，同时debug也会输出
node.error(); // 控制台输出，同时debug也会输出
```
### 异步发送
异步发送`node.send()`，而不是return信息。
```
setTimeout(function(){
    node.send({payload:'来自node.send()发送的异步消息'});
},10*1000);
return null;
```
接收异步消息。
异步发出的消息，其下游的`console、util、Buffer`模块可以接收到消息。
```
// 下游function中，使用console模块输出消息
node.log(msg.payload);
```
### 在function结点中使用context
上下文，应该就是作用域，用来存储信息、状态。
```
if(!context.count){
    context.count = 0;
}
context.count++;
msg.count = context.count;
return msg;
```
看到这里应该就明白了，它应该就是一个闭包。
注意：在作用域（上下文）中存储只是一种暂时的存储，持久化存储可以使用file或database。
### 全局上下文（作用域）
```
context.global.startTime = new Date().getTime();
```
全局上下文中的信息，在其他function中也可以访问。
### 结点的保存和导入
#### 保存
编写好的node可以导出以便复用。
以json文件的形式保存，可以导出到库，或者剪贴板。如果保存到库，则会存在`C:\Users\用户名\.node-red\lib`中。
#### 导入
在库中的结点，可以直接导入。不在库中的结点，可以使用剪切板手动导入。
### 子流程（Sub Flows）
可以通过子流程将一个功能的多个function封装在一起。也就是对完整的功能进行封装。
#### 创建子流程
1、**新建子流程**：点击menu-子流程-新建子流程
2、点击上侧的输入和输出（规定大函数的入口和出口）
3、插入function，指定操作
4、将input和output连接上
5、在左侧子流程一栏中可以看到封装好的结点，直接拽过来即可使用

### 从web页面上抓取数据
```
inject // 无需配置，作为触发器使用
[功能function]http request // 发送http请求，获取页面
[function]html结点 // 选择元素，并指定要获取的值，配置如何输出
[output] debug // 将获取到的值输出控制台
```