# Python
## 基础知识
### 格式化字符串(f-string)
```
name = python
sentense = f"my name is ${name}"
```
### format
```
template = "{}{}{}{}"
print(template.format('1','2','3','4'))
```
### 带换行的字符串
如果一段字符串，需要换行，则要用换行符`\n`，如`"string\n line 2"`。更直观的写法：`""" ... """`。
```
"""
    格式：
空了2个字符
"""
```
再加上`f`，
```
f"""
代码
"""
```
功能几乎和ES6中的模板字符串一样。
### input()
```
age=input('How old are you?')
print(f'You are {age} years old')
```
### 参数变量argv
```
from sys import argv # 引入模块，相当于导包
file,first,second,third = argv # 从argv中unpack出参数，这里按顺序对应解包，ES6中的解构和这个是一个思想
print(f"脚本文件名称为：{file},\n参数1：{first}，参数2：{second}，参数3:{third}")
```
## 文件操作
```
from sys import argv
script,file_name = argv
file = open(file_name,'r',encoding='utf-8') # 参数2为读写模式，参数3为读写编码
file.read() # 读取整个文件
file.readline() # 读取一行内容
file.close() # 关闭文件
file.trancate() # 清空文件，谨慎使用
file.seek(0) # 将读写位置移到文件开头
```
### 文件的读写模式
```
r 读
w 写
a 追加
b 二进制
------------------------------
r 以“只读”模式打开
r+ 以“读写”模式打开
w 以“写”的模式打开，如果文件已经存在，先清空，再创建
w+ 以“读写”模式打开
a 以“追加”模式打开
a+ 以“读写”模式打开
rb “二进制读”
wb “二进制写”
rb+ “二进制读写”
wb+ “二进制读写”
```
## 函数
```
def print_two_1(*args): # 不知道传入参数的个数
    print(args[0],args[1])

def print_two_2(*args):
    arg1,arg2 = args
    print(arg1,arg2)

def print_two_3(arg1,arg2):
    print(arg1,arg2)

print_two_1(1,2,3) # output: 1 2
print_two_2(1,2,3) # ValueError: too many values to unpack
print_two_3(1,2,3) # TypeError: print_two_3() takes 2 positional arguments but 3 were given
```
如果定义了函数参数的个数，则调用时，**输入参数个数必须一致，否则报错**。js中“多输入”完全没事，不够严谨，不过无所谓了。

## 逻辑判断
### if-elif-else
```
if x>1:
    # 大于1
elif x>0:
    # 大于0且小于等于1
else:
    # 小于等于0
```
## 运算符
### 数字运算
除了`+,-,*,/,%`外，
`**`表示幂，`\\`表示整除。
```
2**3 #8
9//7 #1
```
### 逻辑运算
```
与 and
或 or
非 not
```
## 关键字
