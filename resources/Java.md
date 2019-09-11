# Java

## POJO和JavaBean
POJO(Plain Ordinary Java Object)，普通的java类。所谓普通，就是没有实现或继承任何接口或类，可以理解成Plain Old Javascript Object，类似js中的`{}`，不遵循任何规范，原始，干净。

JavaBean，可序列化的POJO，具有无参构造器，属性使用getter和setter进行读写。

## getter和setter
### 为什么要用getter和setter
getter和setter是数据封装的手段，将属性保护起来，仅允许使用setter修改，提高了安全性，使数据可控。
```
class Person {
    private int age;
    public void setAge(int age){
        if(age <= 0 || age >= 120){
            throw new RuntimeException("非法年龄");
        }
        this.age = age;
    }
    public int getAge(){
        return age; // 敏感的信息也可以加密后返回
    }
}
```
## 序列化
将对象信息转换成可存储或可运输的过程叫序列化（Serialization）。
Java中可序列化的信息包括对象中的数据、类型信息，这些信息可以在内存中反序列化--新建对象。

## Tomcat
Tomcat压缩包解压后，将bin和lib目录配置到环境变量中，cmd中startup，可以开启tomcat服务器，说明配置成功。
## Idea配置Server
```
edit-configurations
    |- server //配置Server信息
    |- deployment //添加web项目
        |- application context //设置应用上下文，也就是应用的路由/目录
```
## Maven
### 添加依赖
```
<dependencies>
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>fastjson</artifactId>
        <version>1.2.47</version>
    </dependency>
</dependencies>
```

## Idea新建Maven项目步骤
```
new Project/new Module => Maven => Module SDK => Next => 填写信息 => 生成项目 
右击项目 => add Framework support => Web application
```
### Idea导入依赖包
```
右键项目（module）--Open Module Settings - library
```
注意：servlet里依赖maven管理的包，编译时没问题，运行时出问题，需要将该依赖包复制到tomcat的lib里。如`com.alibaba.fastjson`

## 注解Annotation
### 是什么
注解大概可以理解成标签。事实上，注解也是一个Java类型。
```
// 定义一个注解
public @interface Red {}

// 使用注解
@Red
public class Test {

}
```
### 元注解
元（Meta）注解，用来对自定义注解进行描述（贴标签），元注解有5种，@Retention、@Documented、@Target、@Inherited和Repeatable。
#### @Retention
我记得以前学HPLC时，retention time是保留时间，大概是样品保留在柱子中的时间。在这里，Retention表示“注解”存活的时间。它的取值有：
1. RetentionPolicy.SOURCE 只保留在源码中，编译器编译时忽略
2. RetentionPolicy.CLASS 保留到class文件，不加载到JVM中
3. RetentionPolicy.RUNTIME 保留到运行时期，加载到JVM中
```
@Retention(RetentionPolicy.RUNTIME) // 声明了下面的注释可以保留到运行期
public @interface Red {}
```
#### @Documented
可以被documented，意思是该Annotation可以被写到javadoc中去。
#### @Target
指定Annotation的特异性。取值有：
1. ElementType.ANNOTATION_TYPE 只能修饰Annotation类型
2. ElementType.CONSTRUCTOR 只能修饰构造器
3. ElementType.FIELD 只能修饰字段（属性）
4. ElementType.LOCAL_VARIABLE 修饰局部变量
5. ElementType.METHOD 方法
6. ElementType.PACKAGE 包
7. ElementType.PARAMETER 参数
8. ElementType.TYPE 类、接口、枚举，class、interface、enum是同一层次的概念

#### @Inherited
可以被继承，意思是该注解可以被子类继承，也就是说，子类继承了该注解。
#### @Repeatable
## 注解-属性
```
@Target(ELementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface Color {
    int id() default 0;
    String color() default "White";
}

@Color(id=1,color="Red")
public class Test{}
```
```
// 注解定义了属性，在使用注解时，需要给属性赋值。当注解中只有一个属性时，使用注解不必显式赋值。
@Color("Red")
public class Test{}
```
```
// 如果注解中没有属性，括号可以省略
@Color
public class Test{}
```
以上是注解的基本知识，下面看一下Java预置的一些注解。
## 预置注解
### @Deperated
编写调用修饰后的方法，在ide中会有删除线提示。
### @Override
被@Override修饰的父类方法，子类在书写时，会提示要覆盖该方法。
### @SuppressWarnings
阻止warning
### @FunctionalInterface
函数式标记
