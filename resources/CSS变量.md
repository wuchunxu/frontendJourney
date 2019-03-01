# CSS3的变量
## 基本用法
### 声明变量和使用
```
.box {
    --width:100px;
    width:var(--width);
    height:calc(2 * var(--width));
}
```
