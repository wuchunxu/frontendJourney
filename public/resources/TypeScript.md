# TypeScript
## 安装和使用
```
npm i -g typescript
```
编译ts后生成js文件：
```
tsc helloworld.ts   // helloworld.js
```
## 详细知识
### 类型
typescript中基本类型有：`boolean、number、string、Array、Tuple、enum、any`
#### boolean、number、string
这3个类型与JavaScript中对应，只不过js中不需要把类型写出来而已。声明类型很简单：
```
let success:boolean = true;
let counter:number = 10;
let str:string = 'hello world';
```
#### 数组和元组(Array和Tuple)
```
// 数组中类型必须是一致的，声明的方式类似java、c#
let colors:string[] = ['red','orange','yellow','green','blue','indigo','purple'];
// 也可以使用泛型
let colors: Array<string> = ['red','orange','yellow','green','blue','indigo','purple'];
```
```
//元组：用来声明已知元素数量和类型的数组
let emp:[string,number] = ['Smith',26];
```
#### enum(枚举)
```
enum Color { Red, Orange, Yellow, Green, Blue, Indigo, Purple }
console.log(Color[0]); // Red
```
// ts中枚举编译成js如下：
```
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Orange"] = 1] = "Orange";
    Color[Color["Yellow"] = 2] = "Yellow";
    Color[Color["Green"] = 3] = "Green";
    Color[Color["Blue"] = 4] = "Blue";
    Color[Color["Indigo"] = 5] = "Indigo";
    Color[Color["Purple"] = 6] = "Purple";
})(Color || (Color = {}));
console.log(Color); 
/*
Output:
 { '0': 'Red',
  '1': 'Orange',
  '2': 'Yellow',
  '3': 'Green',
  '4': 'Blue',
  '5': 'Indigo',
  '6': 'Purple',
  Red: 0,
  Orange: 1,
  Yellow: 2,
  Green: 3,
  Blue: 4,
  Indigo: 5,
  Purple: 6 }
  */
```
从编译后的代码我们可以看出，枚举实际上是创建了一个对象，然后将序号和值进行了“双向绑定”。将序号当成key，可以得到值；将值当成键，又可以得到序号(index)。
#### any（任意类型）
#### object
#### void、never
`void`表示没有返回值，`never`表示函数无法到达终点
```
// void表示该函数没有返回值
function warn(info:string):void {
    console.log(info);
}


function error(message: string): void {
        throw new Error('error: ' + message);
    }

function warn(message: string): never {
    throw new Error('warning: ' + message);
}
```
### 类型断言
类型断言类似java中的强制类型转换，但是只在编译时起作用。
```
let str:any = 'abc123';
let len:number = (<string>str).length; // 类似java中(String) str
let len2:number = (str as string).length; // 第二种方式，JSX只识别该方式，因为<string>会被识别成标签对象
```
这里只是展示了语法。

