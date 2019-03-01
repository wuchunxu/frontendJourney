# CSS揭秘
## 技巧
### 平稳退化
CSS3中的新特性有些浏览器还没有支持，但这不是我们不学习和使用新特性的理由。对于那些老旧的浏览器，我们可以通过平稳退化的方式。“高级浏览器”，展现最佳效果；“低级浏览器”，“低配”效果（不至于挂掉）。
#### 利用层叠覆盖的特性
使用渐变色背景，对于不支持的，取渐变色的中间值，平稳退化。
```
background: rgb(255, 128, 0);
background: -moz-linear-gradient(0deg, yellow, red);
background: -o-linear-gradient(0deg, yellow, red);
background: -webkit-linear-gradient(0deg, yellow, red);
background: linear-gradient(90deg, yellow, red); /*高级的将低级的覆盖，不支持的话，则还使用低级的*/
```
#### 检测和适配
利用javascript检测是否支持某个属性，如果支持，则在根元素`<html>`的class上加上支持的标记，反之，加上不支持的标记。然后在CSS中，对支持和不支持的分别写CSS样式。
```
function testProperty(property) {
    var root = document.documentElement;
    if (property in root.style) {
        root.classList.add(property.toLowerCase());
        return true;
    }
    root.classList.add('no-' + property.toLowerCase());
    return false;
}
testProperty('textShadow');//如果支持text-shadow，则根元素加上`.textshadow`，否则加上`.no-textshadow`
```
值的兼容性检测和适配：
```
function testValue(id, value, property) {
    var dummy = document.createElement('p');//创建一个元素，用来测试是否支持某个值
    dummy.style[property] = value;          // 首先将值赋值给该元素的属性
    if (dummy.style[property]) {            // 如果值被保存了，说明支持该值
        root.classList.add(id);             // 那么，将添加的标记加到root的class中去
        return true;
    }
    root.classList.add('no-' + id);         // 否则加上不支持该值的标记
    return false;
}
```
### 代码复用--关联性
以按钮为例，按钮的`padding,border-radius`等都与字号有关，那么CSS代码中，应该以`font-size`为基准，其他尺寸通过`%`或`em`描述，这样，当需要改变按钮尺寸时，只需要改变`font-size`一个即可，提高了代码的复用性。
```
.btn {
    font-size: 1.5rem;/* 15px*/
    /* 其他尺寸以字号为基准，与字号建立关系 */
    padding: .16em .7em;
    border:1px solid rgba(0,0,0,.1);
    color:#fff;
    border-radius:.3em;
    outline:none;
    box-shadow: 0 .1em .3em rgba(0,0,0,.5); /*黑色或白色的半透明与底色叠加可以适配各种底色的阴影效果*/
    text-shadow: 0 -.05em .05em rgba(0,0,0,.5);
    line-height: 1.5; /*行高是字号的1.5倍*/
}
```
#### currentColor
`currentColor`表示引用当前`color`的值。可以让很多颜色（边框、背景色、阴影色、svg-fill色）与`color`进行关联。
#### inherit
`inherit`表示继承父元素的值，如果是伪元素则继承自宿主元素。以提示框气泡为例，`“小三角”只需要一个正方形，边框和背景色继承气泡，顺时针旋转45度，然后去掉右边框和下边框即可`。
```
.callout { position: relative; }
.callout::before {
    content: "";
    position: absolute;
    top: -.4em; left: 1em;
    padding: .35em;
    background: inherit;
    border: inherit;
    border-right: 0;
    border-bottom: 0;
    transform: rotate(45deg);
}
```
### 视觉偏差
>垂直居中：子元素在数字上垂直居于父元素，但视觉上却感觉偏下；数字上微微上调，在视觉上更完美居中。
>卡片padding相等：数字上相等，但视觉上上下边距会更大一些。
>正方形尺寸不变，变成圆形，视觉上会感觉尺寸变小了。
### 响应式页面
媒体查询技术在最后使用。
1. 如果尺寸在大分辨率下固定，应该应该考虑用`max-width`。
## 背景和边框
>hsla(色调0~360,饱和度0~100%,亮度0~100%,透明度0~1)
### 半透明边框
默认情况下，背景会填充到边框，即使边框是透明的，但是背景不是透明的，所以显示不出透明的效果。解决方法是将背景范围设置到`padding`:
```
background: #fff;
border:.8em solid hsla(60, 100%, 80%, .5);
background-clip:padding-box;/*边框透明效果不会被背景挡住*/
```
### 多重边框
利用`box-shadow`可以写多个值，也就是可以写多个阴影，而我们将阴影的模糊效果关闭即可。
```
background: #ffffff;
border:.4em solid red; /*外边框*/
box-shadow:0 0 0 .4em orange inset, /*内第一层边框，宽0.4em*/
           0 0 0 .8em black inset;  /*内第二层边框，宽(0.8-0.4)em*/
padding:.8em; /*将模拟边框部分空间挤出*/
```
```
.multi-dashed-border {
    width: 10em;
    height: 10em;
    background: brown;
    border:1px dashed #efefef;
    outline:.8em solid brown;
    outline-offset: -19px; /*控制描边到边框的距离，可以为负值*/
    margin:.8em;
    border-radius:50%;
    box-shadow: 0 0 0.1em 0.02em rgba(0,0,0,.5);
}
```
#### 外边框是直角，内边框是圆角。
```
.rect-radius {
    width: 10em;
    height: 8em;
    background: tan;
    border-radius:.5em;
    outline:.4em solid #655;/*外边框--直角*/
    margin:.4em;
    box-shadow: 0 0 0 .4em #655; /*模拟外边框--圆角*/
}
```
### 斑马条纹背景
#### 方法1
使用`linear-gradient`，原理是，当两个颜色的位置重叠时，渐变之间的区间为0，即没有渐变，此时就得到两个颜色条带。
```
background: linear-gradient(to bottom,red 50%,green 50%); /*改变百分比(位置)，可以得到比例不一样的条带*/
background-size:100% 30px; /*本来渐变充满整个屏幕，现在规定一下宽和高，就得到条带砖头*/
background-repeat:repeat; /*让条带重复变成墙*/
```
手动重复方法对于有角度的渐变会稍微麻烦一点，首先要做出“斜条纹砖头”，然后重复。
#### 方法2
使用`repeating-linear-gradient`，自动重复，不需要先制作“砖头”。
```
background: repeating-linear-gradient(45deg, #fb3, #fb3 15px, #58a 15px, #58a 30px);
```
#### 终极版
更多时候，我们并非要两个反差很大的颜色作为条带，而是一种颜色，深浅相间隔。
首先设置单纯色背景，在该背景上，加上间隔透明色。这样写的好处是，将代码变得更具有拓展性。
```
.subtle-stripes{
    background: #fb3;/*#58a*/
    background-image: repeating-linear-gradient(45deg,
        hsla(0,0%,100%,.1),hsla(0,0%,100%,.1) 15px,
        transparent 0,transparent 30px
    );
}
```
当需要改变颜色时，只需改变`background-color`即可。