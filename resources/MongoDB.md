# MongoDB
## 配置服务
### 启动MongoDB
#### 命令行启动
```
mongod --dbpath d:\mongodb\data  # 指定数据库存储位置
```
#### 通过配置文件启动
```
mongod -f  D:\mongodb\config\mongo.config 

// D:\mongodb\config\mongo.config
dbpath=D:\mongodb\data
logpath=D:\mongodb\logs\mongo.log  # 设置log路径，设置后，cmd中就不再显示log信息了
logappend=true # 重启服务后，log追加到已有的文件中
```
### 配置windows服务
```
// 注册服务，【管理员权限运行】
mongod --install -f  D:\mongodb\config\mongo.config --serviceName "MongoDB"
```
```
net start MongoDB # 开启服务
net stop MongoDB # 关闭服务

mongod --remove # 卸载服务，删除服务
```
## 基本操作
### 创建数据库
### 增
```
var record = {
    create_date:'2019-03-29',
    case_resources:[
        {
            rptor_type_name:'12345电话热线(市)',
            rptor_type_id: 33,
            case_amount: 1346
        }
    ]
};
db.bigscreen.insert(record)
db.bigscreen.find({create_date:'2019-03-29'})
```

### 查
```
db.books.find();  //默认最多返回20个符合条件的文档
db.books.findOne(); //查看符合条件的第一个文档
db.books.findOne({type:"JavaScript"});  //findOne方法可以传参
```
### 删
### 改
```
// 往一条记录中数组中插入1条数据
db.bigscreen.update(
    {create_date:'2019-03-29'},
    {'$push':{
        'case_resources':{
            rptor_type_name:'12345电话热线(区)',
            rptor_type_id: 23,
            case_amount: 68372
        }
    }
})
```
```
// 往指定记录中数组中插入多条数据
db.bigscreen.update(
    {create_date:'2019-03-29'},
    {
        '$push':{
        'case_resources':{
            '$each':[
                {
                    rptor_type_name:'数字城管（市）',
                    rptor_type_id: 30,
                    case_amount: 16381
                },
                {
                    rptor_type_name:'寒山闻钟（网页）',
                    rptor_type_id: 24,
                    case_amount: 2197
                }
            ]
        }
    }}
)
```
#### 修改数组中的某个值
```
/*
    数据库中文档格式：
    {
        'update_time':'2019-04-01',
        'case_resources':[
            { rptor_type_id: 24, case_amount:2100 },
            ...
        ]
    }
*/
db.bigscreen.update(
    {
        'update_time':'2019-04-01', // 定位到这条记录
        'case_resources.rptor_type_id':24 // 定位这条记录中数组中的某个对象
    }, 
    {
        $set:{'case_resources.$.case_amount':2437}  // $表示查询文档匹配到的对象
    } 
)
```