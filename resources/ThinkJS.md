# ThinkJS
## 目录结构
```
|- app  # src中文件编译后存到此处，这里是最终运行的代码
|- node_modules # 依赖，部署时，用npm install自动生成
|- runtime
|- src
    |- bootstrap # 该目录在项目启动时自动执行
    |- config
        |- adapter.js
        |- crontab.js # 配置定时服务
        |- extend.js
        |- middleware.js
    |- controller
    |- logic
    |- model
|- test
|- view
|- www
development.js
nginx.config
package.json
pm2.json
production.js
```
## controller

## 架构理解
### ThinkJS是如何处理用户请求的？
1. WebServer（如Nginx）将请求反向代理给node。
2. Node的Master进程将服务分配给对应的Worker进程（如何分配的，需要进一步了解）。
3. Worker进程通过注册的中间件（middleware）来处理用户的请求。

#### 中间件
中间件存在数组中，这样，中间就按序串联起来
```
//src/config/middleware.js
module.exports = [
    {
        handle: 'resource',
        enable: isDev,
        options: {
        root: path.join(think.ROOT_PATH, 'www'),
        publicPath: /^\/(static|favicon\.ico)/
        }
    },
    ...,
    'logic',
    'controller'
];
```
## 部署
部署只需要将整个项目拷至服务器上即可（node_modules文件夹除外），然后安装依赖即可。
```
$ npm run compile # 最好重新编译一下
```
### PM2管理node服务
#### 安装pm2
```
$ npm install -g pm2 # 第一次使用需要全局安装pm2
```
#### 修改pm2.json
```
{
  "apps": [{
    "name": "backend", # 给项目起个名字
    "script": "production.js",
    "cwd": "E:\myProject\backend", # 将cwd属性改成项目的根目录
    "exec_mode": "fork",
    "max_memory_restart": "1G",
    "autorestart": true,
    "node_args": [],
    "args": [],
    "env": {}
  }]
}
```
#### 启动/重启项目
```
$ pm2 start pm2.json # 启动服务
$ pm2 restart pm2.json # 重启服务
```
可以将`restart`命令写在`restart.cmd`文件下，方便重启服务。
## Model扩展
首先在配置文件中添加扩展：
```
// src/config/extend.js
const model = require('think-model');

module.exports = [
  model(think.app) // 让框架支持模型的功能
]
```
添加扩展后，新增方法：`think.Model、think.model、ctx.model、controller.model、service.model`。