# transform
## 属性
### translate
### scale
### rotate
#### 设置旋转度数
```
transform: rotate(30deg); // 以元素中心为原点，顺时针旋转至30°
transform: rotate(-30deg); // 以元素中心为原点，逆时针旋转至30°
transform: rotate(1turn); // 顺时针旋转1圈 rotate(360deg)
```
#### 设置旋转中心
```
transform-origin:50% 50%; // 默认
```
要注意，这里的50%是相对于元素自身，围绕着正中心旋转。
#### 动画旋转
```
/* 定义帧 */
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
.spinner {
    width: 100px;
    height: 100px;
    background: red;
    animation: spin 5s linear infinite;
    transform-origin: 0 0; /*将旋转中心设置为左上角*/
}
```
