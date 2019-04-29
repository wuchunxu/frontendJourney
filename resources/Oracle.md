# Oracle
## 问题
### 【查询】如何将多条记录的某些字段值合并
#### 需求：查询用户时，有些用户有多个职务，因此对应多条记录。现需要将多个职务合并在一起。
第一步：使用`WM_CONCAT()`函数，将该字段对应的值合并，结果`TO_CHAR()`之后变成字符串，值与值之间以逗号“`,`”隔开。
第二步：有相同的值，在java或者node.js中进行去重即可。`data_src => split => 去重 => join(',')`

```
SELECT phone_num,user_name,position_name,ext_prop3_str,TO_CHAR(WM_CONCAT(unit_name)) AS unit_name,TO_CHAR(WM_CONCAT(ext_prop1_str)) AS ext_prop1_str,TO_CHAR(WM_CONCAT(grid_position_name)) AS grid_position_name
FROM users
GROUP BY phone_num,user_name,position_name,ext_prop3_str
```
【注意】：mysql中合并函数为`GROUP_CONCAT()`。

