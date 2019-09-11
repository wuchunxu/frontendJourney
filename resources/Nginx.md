# Nginx
## 文件目录
下载后解压，存放的路径中不能有中文。
```
    --config
        |-- nginx.config  // nginx服务器配置文件
    --contrib
    --docs
    --html
    --logs
    --temp
    nginx.exe
```
## 常用操作
### 开启服务器
```
$ start nginx
$ tasklist /fi "imagename eq nginx.exe" // 检查是否已经开启
```
### 关闭nginx
```
$ nginx -s stop // (快速停止nginx)
$ nginx -s quit // (完整有序的停止nginx)
```
### 重启服务器
```
$ nginx -s reload
```

## 反向代理
### 配置反向代理
```
//config/nginx.config
server {
    listen       8300;
    server_name  localhost;
    
    rewrite_log on;
    
    location / {
        root   html;
        index  index.html index.htm;
        try_files $uri /index.html; # 让前端路由生效
    }
    location /api {
        rewrite  ^/api(.*)$ /api/$1 break;
        proxy_pass   http://127.0.0.1:8360;
    }
}
```
匹配`/api`，匹配到的值重定向到`proxy_pass`指定的地址。利用反向代理，可以实现跨域请求。
### 反向代理的用途
#### 保护内网的安全
1. 对外仅提供指定的端口访问权限。例如这里的8300端口。
2. 在8300端口的应用中，其他服务如数据服务由服务器的其他端口（如8360）提供。
3. 入网规则中，外界无法访问8360端口。
4. 在8300的访问路径中，设置指定路径(如`/api`)，将其转发给8360端口，这样，外界获取到了数据，但是不知道哪个服务器提供了数据。当然，可以将服务转发到另一台主机上。
#### 负载均衡
#### 缓存，减轻服务器的压力
