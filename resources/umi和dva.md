# umi和dva
## yarn
### 安装和配置环境
官方推荐使用`yarn`代替`npm`来管理`package`:
```
//全局安装yarn和tyarn(国内源)
npm i yarn tyarn -g
```
```
yarn global bin
```
找到yarn的路径，将该路径设置到环境变量中去。cmd中可以正常运行，但是`power shell`中提示不能运行脚本。
### 基本使用
```
yarn //安装依赖，对应npm install
yarn start // 启动项目，对应npm start
```
## umi.js
简单地理解，`umi`是`roadhog`和`next.js`的结合（也就是封装了`webpack`、`路由`）并且还有一套插件机制。`umi = webpack + router + plugin(插件)`
### 安装
```
// 使用国内源全局安装umi
tyarn global add umi
```
### 创建项目
```
tyarn create umi
...
tyarn // 安装依赖
yarn start // 启动项目
```
之后根据提示，选择创建的内容。
当选择app时，有多选框，space键选中，enter确认并结束选择。其中`code splitting`是代码分离按需加载的意思。
### 生成代码(类似ng)
```
umi g page index // 生成页面index
umi g component chart // 生成组件chart
umi g layout
```
### 启动本地服务器
```
umi dev
```
### 部署发布
```
umi build // 构建
```
构建后的文件存到`./dist`下，可以用serve该文件夹进行验证（试运行），如果没问题，应该和`umi dev`一致。
```
tyarn global add serve
serve ./dist
```
下面的部署也可以直接手动复制dist中的文件，拷贝到远程服务器上
```
tyarn global add now
now ./dist // 部署
```
### umi路由

#### 跳转
```
import Link from 'umi/link';

export default () => (
  <Link to="/list">Go to list page</Link>
);
```
```
import router from 'umi/router';

function goToListPage() {
  router.push('/list');
}
```
## dva.js