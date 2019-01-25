# React
## 函数式编程
### 了解函数式编程--WHAT,WHY
**JavaScript中函数可以赋值给变量，那么函数就可以当作变量来使用了。比如，函数可以当作参数进行传递，也可以作为结果返回**(说到这里，我想到了闭包，闭包形成的很自然啊)。

函数式是一种编程范式，与面向对象技术不同。为什么要用函数式，可以先了解一下“命令式”和“声明式”编程方式的区别。像ES5中，Array.prototype.map、reduce函数就是函数式，它们的参数是一个回调函数，用来定义遍历数组的操作。用map与for循环的区别是，前者更关注对数组元素的具体操作，不用考虑如何遍历了。

函数式将具体实现过程进行了封装。小函数联合使用可以封装成大的函数，就像“搭积木”。这一点来看，模块的封装也是类似的道理。

### 使用ES6语法
#### 使用const可以保证函数定义后不会被重写
```
const log = (msg)=>console.log(msg) ;
```
### 函数式编程的基本概念
#### 不可变性
不可变性的工作机制是，不改变原数据，在拷贝上修改。
```
let color_lawn = {
    title:"lawn",
    color:"#00ff00",
    rating:0
}
//ES5写法
var rateColor = function(color,rating){
    return Object.assign({},color,{rating:rating});
}
//ES6写法
const rateColor = (color,rating)=>({
    ...color,
    rating
})
//数组
const addColor = (title,list)=>[...list,{title}]
```
### 纯函数
纯函数(1)至少接收一个参数；(2)必须返回一个值；(3)不能修改外环境和参数
### 数据的转换
ES5为Array新增了API，其中就有不少是“干净的”操作(不影响原数组)。
#### Array.prototype.filter--数组的过滤
按照以前的思路，我们可能会用for循环遍历，if判断，找到目标值并用splice()将其删除。这里，按“不可变的原则”，我们可以使用filter：
```
const colors = ['blue','red','green','yellow'];
const removeColor = (remove,arr)=>{
    return arr.filter(color=>color !== remove) //只要不是去除对象就留下
}
    console.log(removeColor('yellow',colors).join(','));
```
#### Array.prototype.map
            
**需求：创建纯函数，修改对象数组中的某个对象。**
```
let colors=[
    {name:"red"},
    {name:'green'},
    {name:'yellow'}
];
//创建纯函数
const editColors = (oldName,name,arr)=>
    arr.map(ele=>ele.name===oldName?({...ele,name}):ele)
    
    console.log(editColors('yellow','blue',colors));
```


#### 对象转换成数组
```
const colors = {
    "red":"#FF3030",
    "green":"66CD00",
    "blue":"63B8FF"
};
//将该对象转换成数组
const = colorsArray = Object.keys(colors).map(key=>{
    name:key,
    value:colors[key]
})
```
#### Array.prototype.reduce
```
//利用reduce求最大值
const nums = [2,1,6,22,16,5,5,10];
const max = nums.reduce(
    (max,num)=>(num>max)?num:max
,0)
```
### 高阶函数
#### WHAT
高阶函数是可以操作其他函数的函数。可以将函数当作参数传入，也可以返回一个函数，或者两着都有。
### 函数的合成
函数式编程通常将具体的业务逻辑拆分成小型的**纯函数**，最终再整合到一起构成应用。像jQuery中的链式调用就是合成的一种方式，不过还有更优雅的：
```
const compose = (...fns) =>
    (arg) => fns.reduce(
        (result,fn)=>fn(result),
        arg
    )
```
## React日常使用
### cli安装React
```
npm install -g create-react-app //安装工具
create-react-app myapp
```
### 使用scss
#### 安装sass-loader
```
npm i sass-loader node-sass --save-dev
```
#### 修改webpack文件
在node_modules/react-scripts/config目录下找到webpack.config.dev.js文件，直接在node_modules中修改配置文件会导致项目移植出问题，所以需要将配置文件从node_modules中暴露出来，`npm run eject`
```
{
    test:/\.scss$/,
    loaders:['style-loader','css-loader','sass-loader'
    ]exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/,/\.scss$/
},
```
### 设置Proxy
```
//在package.json里添加：
"proxy": {
    "/": {
        "target": "http://20.255.48.2:9003",
        "changeOrigin": true,
        "secure": false
    }
}
```
### 兼容IE9-IE10
React自带的babel编译只是将ES6、ES7..等语法的代码转换成ES5，但是没有ES6及以后的API，所以要polyfill。
#### 第一种：babel-polyfill
```
npm i babel-polyfill --save
//在根文件index.js最上面导入polyfill
import 'babel-polyfill';
```
#### 【推荐】第二种：core-js
```
npm i core-js --save
npm i raf --save;
```
```
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill'; //polyfill requestAnimationFrame
```
#### 使用antd中Layout布局，只能兼容到IE10
使用了Flex布局，仅支持到IE10，`-ms-`

## JSX
### JSX基础知识
JSX是JavaScript的一种扩展语法。
#### 可以嵌入表达式
```
const user = {
    firstname:"Wu",
    lastname:"Chunxu"
};
//如果JSX表达式换行，建议加上括号
const element = (
    <h1>Hello,{user.firstname+user.lastname}</h1>
);
ReactDOM.render(
    element, 
    document.getElementById('root')
);
```
JSX编译后变成js对象。我们可以这么理解，JSX语法只是为了简化js生成DOM元素对象，那么，我们就可以把JSX当作js对象。它可以作为参数、返回值或者赋值给某个变量。          

#### 属性中插入表达式
属性的值如果是一个变量，那么就要用到表达式，JSX语法规定，js表达式写在`{}`内，而普通的字符串则写在引号`""`内。
```
const element = <img src={require(user.avatarUrl)}/>;
```
#### JSX默认防止注入攻击(XSS)
#### JSX的写法偏向于JavaScript
因此，html中的属性要采用js中的驼峰写法。
```
const element = (
    <h1 className="greeting">Hello World</h1>
);
```
### 元素渲染
像下面element元素，它编译后只是一个普通的对象，非常容易创建，ReactDOM负责更新DOM。
```
//html文件中应该有一个根DOM节点，它的内容由ReactDOM来管理。单纯用React构建的应用只有一个根，而将React嵌入到现有的app则可能有多个根DOM节点。
<div id="root"></div>
        
const element = <h1>Hello,world</h1>
ReactDOM.render(
    element,
    document.getElementById('root')
);
```
#### 更新已经渲染的元素
```
function tick(){
    const element = (
        <div>
            <h1>Hello,world</h1>
            <h2>现在是{new Date().toLocaleTimeString()}</h2>
        </div>
    );
    ReactDOM.render(
        element, 
        document.getElementById('root')
    );
}
setInterval(tick,1000); //每隔1秒钟，重新渲染
```
要特别注意的是，React元素是immutable，一旦创建无法修改(包括子元素和属性)，只能重新渲染。ReactDOM会检查当前元素与之前版本的差异，只对有必要更新的DOM进行更新。

Angular中也可以使用immutable特性。            

## 组件和属性
### 组件
组件类似JavaScript中的函数，接收输入(props)，返回React元素，用以描述屏幕要显示的内容。
#### 定义组件
组件是一个类，在ES6之前没有类的概念，也可以用构造函数的写法。
```
//函数式组件写法
function Welcome(props){
    return <h1>Hello,{props.name}</h1>
}

//ES6类的写法
import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class Welcome extends Component{
    render(){
        return <h1>Hello,{this.props.name}</h1>
    }
}
```
#### 使用组件
在使用组件时，JSX的属性会被封装在一个对象中，如下例，会被封装到{name:"wuchunxu"},这个对象名为props
```
ReactDOM.render(
    <div> //必须有根标签
        <Welcome name="Tom"/>,
        <Welcome name="Jerry" /> //空标签必须闭合
    </div>,
    document.getElementById("root")
);
```
### 属性
属性就是参数，用来传递值。注意：**组件无法修改props对象，所有的组件必须是纯函数(不能修改输入)。**

## 属性 Props
### Props
组件实质上是一个函数，它接收参数，并返回JSX元素。由于JS不是强类型语言，不能限制参数的类型和数量，使用组件，在运行时才发现出错。为了解决该问题，React提供了属性验证和默认属性。
### 属性验证和属性默认值
#### 类写法
```
class Summary extend React.Component {
    //属性验证器，静态的，属于类
    static propTypes = {
        ingredients:Proptypes.number,
        steps: Proptypes.number,
        //自定义属性验证
        title:(props,propName)=>
            (typeof props[propName] != 'string')?
                new Error('标题必须为字符串'):
                    props[propName].length>20 ? 
                        new Error('标题不能超过20个字符'):
                        null
    }
    //默认值
    static defaultProps = {
        ingredients : 0,
        steps: 0,
        title : "[recipe]"
    }
}
```
#### 函数写法
```
const Summary = ({ingredients=0,steps=0,title='[recipe]'})=>
    return (...)

Summary.propTypes = {

}
```
默认属性如果是函数：
```
static defaultProps = {
    onClick:f=>f //占位符，被js调用，但没有任何动作
}
```
类型 | 验证器
数组 | React.PropTypes.array
布尔类型 | React.PropTypes.bool
函数 | React.PropTypes.func
数字 | React.PropTypes.number
对象 | React.PropTypes.object
字符串 | React.PropTypes.string

## 高阶组件
### 什么是高阶组件
>高阶组件(HOC)是一个简单函数，它接收一个组件作为参数，然后返回一个新的组件。

#### 高阶函数与高阶组件
- React中，组件就是函数(纯函数)。
- 高阶函数是可以操作其他函数的函数，即将函数作为参数传入，再返回另外一个函数。
- 类似地，高阶组件是可以操作其他组件的组件(函数)，以组件为参数传入，再返回一个新组件。

由此看来，高阶组件更像是一个加工厂，用来将已有的组件包装成具有新特性的新组件。
### 何时使用高阶组件
#### 例
比如页面有三种弹窗一个有title，一个没有，一个又有右上角关闭按钮，除此之外别无它样，你总不能整好几个弹窗组件吧，这里除了tilte,关闭按钮其他的就可以做为上面说的基本材料。
#### 例
在每个组件内部去调用后端API不是理想的选择，因为这样会导致应用的数据管理混乱，并且组件无法复用。利用高阶组件，我们可以重用加载数据的功能。
>总结：在开发一类组件时，将共性部分提取到组件中，非共性部分使用高阶组件加工整合到基本组件中，从而形成具有个性的新组件。
>思考：从本质上来讲，高阶组件解决的函数式编程中共性与个性的问题。与面向对象编程中的继承解决的是同一类问题。在OOP中，将共性抽象(提取)出来，通过继承或者实现接口的方式为基本类“添油加醋”。
### 柯里化
```
const divide = (a,b) => a/b;
divide(1,2);
//柯里化
const divideCurrying = a => b => a/b;
divideCurrying(1)(2);
```
## 生命周期(新)
React v16.3将`componentWillMount、componentWillReceiveProps、componentWillUpdate`设成`UNSAFE_`，并且提示在17版后将这3个生命周期废除。但是添加了两个新的生命周期：`static getDerivedStateFromProps`和`getSnapshotBeforeUpdate`。
### static getDerivedStateFromProps
该钩子函数触发时间：
1. 组件构建完成之后，挂载之前;
2. 每次获得新的props之后。
```
static getDerivedStateFromProps(nextProps,prevState){

}
```
### getSnapshotBeforeUpdate



### 废除的原因
1. 在首次加载异步请求数据时，`componentWillMount`并没有比`componentDidMount`有多少优势；
2. `componentWillMount`中订阅事件可能不会在`componentWillUnmount`中销毁。在以后的异步渲染机制中，`componentWillMount`可能被其他事务打断，导致`componentWillUnmount`不被触发，最终导致内存泄漏。而`componentDidMount`之后一定会触发`componentWillUnmount`
