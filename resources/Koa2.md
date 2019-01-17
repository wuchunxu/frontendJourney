# Koa2
## 安装
```
npm i koa
```
## 基本使用
```
const Koa = require('koa');
const app = new Koa();

app.use();

app.listen(8000,()=>{
    console.log('listening at port 8000')
});
```

## 使用中间件
### koa-bodyparser


### koa-router
路由中间件，用来为不同的url分配不同的资源。
```
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router(); //创建路由实例

// 配置路由
router
    .get('/',(ctx,next)=>{
        ctx.body = 'This is home page';
    })
    .get('/second',(ctx,next)=>{
        ctx.body = 'This is second page';
    });

// 使用路由
app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(8000,()=>{
    console.log('server starting at port 8000');
})
```
