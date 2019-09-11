# Linux
以Centos为例
## 目录结构
```
/ # 根目录
/etc # 系统管理配置文件
/usr # 存放应用程序，类似Windows的program file文件夹
```
## 重启/关机
```
reboot
shutdown -r now # 立即重启
```
## Docker
### 为什么要用Docker
软件有一个很大的问题是，在开发的机器上跑的好好的，但是移植到另外一台机器就跑不了，原因是另外一台主机可能缺少相应的依赖或者环境配置。那么，如果将软件及其运行所需要的依赖环境打包成一个独立的整体，它就可以在其他机器上愉快的玩耍了。Docker就可以让你打包。
Docker分社区版（Community Edition）和企业版（Enterprise Edition）。
安装过程上菜鸟教程找。
### 如何使用Docker
```
service docker start # 开启docker服务，注意它会 Redirecting to /bin/systemctl start docker.service
或者 sudo systemctl start docker
chkconfig docker on # 开机自启docker

docker run hello-world # 运行某个镜像
docker ps # 查看所有容器
docker start container_name/container_id #启动
docker stop container_name/container_id #停止
docker restart container_name/container_id #重启
```
### Docker的常用命令
```
docker pull image_name # 如 docker pull node，从仓库里拉取镜像
docker pull centos:latest # 拉取最新版centos镜像

docker images # 查看主机下有哪些镜像
docker ps -a # 查看所有容器，-a表示包括未运行的



docker attach container_name/container_id # 进入容器
docker run -t -i container_name/container_id /bin/bash # 运行容器中的镜像，调用镜像里的bash

docker stop container_name/container_id # 停止容器运行
docker rm container_name/container_id # 删除某个容器
docker rmi image_name # 删除镜像
```
### Dockerfile
```
FROM mhart/alpine-node:8.9.4 # 引入镜像

WORKDIR /animaris # 指定工作路径
COPY package.json /animaris/package.json
RUN npm i --production --registry=https://registry.npm.taobao.org

COPY src /animaris/src
COPY view /animaris/view
COPY www /animaris/www
COPY production.js /animaris/production.js

ENV DOCKER=true
EXPOSE 8360 # 指定对外开放的端口
CMD [ "node", "/animaris/production.js" ]
```
在dockerfile所在目录下，`docker build -t wuchunxu/bigscreen_factory_backend .`
### 如何将自己的服务打包到docker里
比如：java、nodejs