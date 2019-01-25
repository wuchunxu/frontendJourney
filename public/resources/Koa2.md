# Koa2
## 安装和基本使用
```
npm i koa
```
```
const Koa = require('koa');
const app = new Koa();

app.use();

app.listen(8000,()=>{
    console.log('listening at port 8000')
});
```

## 使用中间件
### 中间件--POST参数解析(koa-bodyparser)
将post提交的参数存到`ctx.request.query`里。
```
npm install koa-bodyparser --save
```
```
const bodyparser = require('koa-bodyparser'); // 导入中间件

app.use(bodyparser()); // 使用中间件
```

### 中间件--路由(koa-router)
路由中间件，用来为不同的url分配不同的资源。
```
npm install koa-router --save
```
### 单层路由
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
    })
    .get('/redirect',(ctx)=>{    // 重定向
        ctx.response.redirect('/');
    });

// 使用路由
app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(8000,()=>{
    console.log('server starting at port 8000');
})
```
#### 多层路由(子路由)
```
...

const first = new Router();  // 创建子路由1
const second = new Router(); // 创建子路由2

//配置子路由
first
    .get('/',async(ctx,next)=>{
        ctx.body = 'This is first index';
    })
    .get('/red',async(ctx,next)=>{
        ctx.body = 'This is first red page'
    });

// 子路由2
second
    .get('/',(ctx,next)=>{
        ctx.body = 'This is second index page'
    })
    .get('/red',(ctx,next)=>{
        ctx.body = 'This is second red page'
    });

// 将子路由装载到父路由上
router
    .get('/',(ctx,next)=>{
        ctx.body = 'This is index page'
    })                                                       // 配置路由使用get()，表示get请求
    .use('/first',first.routes(),first.allowedMethods())     // 注意：装载使用use()方法，是否用get()交给子路由去实现
    .use('/second',second.routes(),second.allowedMethods());

...

```
## Cookie
```
...
app.use(async(ctx)=>{
    
    if(ctx.url==='/'){
        // 设置Cookie
        ctx.cookies.set('name','wuchunxu',{
            // domain:'localhost',
            // path:'/cookie',
            maxAge:1000*60*60, // 单位ms，这里设置1h，HTTP 1.1新增
            expires:new Date('2019-1-20'),  // 绝对过期时间，HTTP 1.0就有
            httpOnly:false,
            overwrite:false
        });
        ctx.body = 'Cookie has been set, press F12 and check it up in application';
    }else if(ctx.url==='/cookie'){
        // 读取Cookie
        let cookie_name = ctx.cookies.get('name');
        if(cookie_name){
            ctx.body = cookie_name;
        }
    }
});
...
```
cookie，"小饼干"，这里是服务器存储在客户端的容器，以“键值对”的形式保存信息，单个cookie大小不超过4kb。每次http请求都会将cookie发送给服务端，如果cookie较大，是浪费资源的。
如果未设置`maxAge`，则该cookie为会话cookie，一般保存在内存里，随浏览器关闭而销毁。
