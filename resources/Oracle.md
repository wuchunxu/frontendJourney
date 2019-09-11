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
#### 字段是中文返回无数据
```
SELECT 企业名称 FROM gps_aj_zb WHERE rownum > 0 AND rownum <=1
```
【问题描述】执行以上语句nodejs中返回结果为`[{}]`；
【探索过程】
1) 将字段`企业名称`改成`企业名称1`，结果为`Error: ORA-00904: "单位名称1": 标识符无效`，说明**中文字段没有出错，而且Oracle成功执行了该语句。**同时，可以明确知道：语句正确传递到数据库，说明并非字符集问题。
2) 将语句改成`select *`，返回结果中，英文字段都有数据，只有中文的没有，提示：**数据库对sql语句的执行与是否包含中文字段无关，而返回结果可能与字段是否为中文有关**。
3) 于是，尝试：将中文字段as成英文名：
```
SELECT 企业名称 as company_name FROM gps_aj_zb rownum > 0 AND row num <=1
```
**结果正确地返回了数据。问题解决！**
#### 多表关联查询并分页
本来我不知道3张表可以连续inner join，于是table1 INNER JOIN table2，结果再INNER JOIN table3，这样rownum就不好用了。
解决办法：
```
SELECT *
FROM (
    SELECT rownum AS rowno, t1.name,t1.type
    FROM table_1 t1
    INNER JOIN table_2 t2 ON t1.field_1 = t2.field_2
    INNER JOIN table_3 t3 ON t1.field_3 = t3.field_3
)
WHERE rowno > 10 AND rowno <= 20
```
注意：内层select写字段要带上表名如：`t1.name`