# J2EE
## Servlet
### Servlet是什么
Servlet是HTTP客户端（WEB浏览器）和数据库或其他应用程序之间的中间层，通过Servlet，可以获取客户端发送的信息，处理后进行转发或储存。
### Servlet是如何工作的
1. 由于servlet不在java se里，相当于是一个扩展包，所以首先需要告诉编译器servlet包的位置。在IDEA中，配置tomcat Server时，会自动导入jsp-api和servlet-api。
2. servlet实现类编译后生成class文件，在WEB-INF/web.xml中配置servlet信息，告诉服务器，当请求某个指定url时，请求转到对应的servlet的class文件，运行servlet。

#### 目录
```
webapp
    |- src
        |- FirstServlet.java // 在这里实现servlet
    |- web
        |- WEB-INF
            -- web.xml // 在这里定义url与servlet配对信息
        -- index.html // 页面文件

```
#### 生命周期
```
class FirstServlet extends HttpServlet {
    public init(){
        // 只执行一次
        // 第一次访问该servlet时执行
        // 或者设置服务器启动时执行
    }
    public service(){
        // service()方法由容器调用
        // 我们无需覆盖这里的代码
        // 编码时需要实现doGet()、doPost()、doPut()、doDelete()
    } 
    public doGet(HttpServletRequest request,HttpServletResponse response) throws IOException{
        // GET 请求
    }
    public doPost(HttpServletRequest request,HttpServletResponse response) throws IOException{
        // POST 请求
    }
    public destroy(){
        // 服务器关闭时调用
        // 关闭数据库连接、停止后台线程、把 Cookie 列表或点击计数器写入到磁盘，并执行其他类似的清理活动。
    }
}
```
注意：不同客户端同时访问同一个servlet时，servlet的成员变量会被线程共享，doGet()方法里局部变量互相独立。
#### web.xml配置样例
```
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <servlet>
        <servlet-name>FirstServlet</servlet-name>
        <servlet-class>FirstServlet</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>FirstServlet</servlet-name>
        <url-pattern>/firstServlet</url-pattern>
    </servlet-mapping>
</web-app>
```
### doPost()实现
```
// 获取所有的参数，打包成json返回给客户端
public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {

        Enumeration all_names = req.getParameterNames(); // 拿到所有参数的name
        ArrayList<String> keys = new ArrayList<String>();
        JSONObject obj = new JSONObject();

        while (all_names.hasMoreElements()) {
            keys.add((String) all_names.nextElement()); // 导入到ArrayList中
        }

        // 将所有的键值对存到json对象中
        keys.forEach(name -> obj.put(name, req.getParameter(name)));

        PrintWriter out = res.getWriter();
        out.println(obj);
    }
```
## Idea
### maven项目编译版本问题
pom.xml
```
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.3</version>
            <configuration>
                <source>1.8</source>
                <target>1.8</target>
                <encoding>UTF-8</encoding>
            </configuration>
        </plugin>
    </plugins>
</build>
```
## 事务Transaction
### 数据库事务
#### 什么是事务
不可分割的一系列操作称为事务，这些操作要么全部完成，要么全部失败。比如转账，就是一个事务，A扣钱和B加钱要么都成功，要么都失败。这就是事务的原子性（事务的过程是一个不可分割的单元）。该事务的结果只可能有2个：1) A扣钱成功，B加钱成功；2) A扣钱失败，B加钱失败。没有中间状态。这就是一致性，或者说是完整性。

在并发时，如果没有隔离，数据就可能会串掉。
情况1：甲修改了数据A，接着B读取了修改后的A，但是后来A回滚了修改，就是导致数据不一致。（脏读）
情况2：乙读取了数据A，接着甲修改了A，并提交了，乙再次读取数据A时，和上次读取的数据不一致了。（重读不一致）

事务隔离级别有：
Read uncommit | 可读取未提交的 | 未解决任何并发问题
Read commit | 可读已提交的 | oracle默认级别，只解决了脏读问题
Repeatable Read | 读取结果可重复 | Mysql默认级别
serializable | 序列化的 | 最高级别，并发事务只能按顺序执行
## 反射
反射（Reflect）是Java提供的一种技术或手段，目的是在运行时，通过反射可以获取任意类或者对象的属性和方法。
## 代理模式
### 理解代理的含义
某对象有一个方法，现在它不直接调用该方法，而是先把自己传递给代理，由代理来执行相应的方法，而那个相应的方法中包含了被代理对象的方法。

```
// Emp
package com.wcx.JDKProxy;

public class Emp {
    private String name = null;
    private String job = null;

    public Emp(String name,String job){
        this.name = name;
        this.job = job;
    }

    public void checkIn(){
        System.out.println("【"+job+"】【"+name+"】签到");
    }
}
```
```
package com.wcx.JDKProxy;

public class EmpProxy implements CheckIn{
    private Emp emp = null;
    public EmpProxy(Emp emp){
        this.emp = emp;
    }

    @Override
    public void checkIn() {
        emp.checkIn();
    }
}
```