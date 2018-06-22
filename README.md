# 说明
* 这是一个应用于gamewith网站feh抽卡模拟器的批量抽卡脚本
* 需要结合脚本插件 (例如暴力猴) 来使用.
* 脚本地址 (通过插件添加该地址即可生效): https://openuserjs.org/scripts/dudueasy/choukatest 

# 功能
* 可以实现指定数量石头的单色抽卡, 多色抽卡和全部抽取的行为.

# 使用
* 抽卡命令: 
```
start(amount, color, interval=10)
``` 
    * amount: 该参数为数字
    * color: 该参数为字符串
         * 选项: 'red','green','blue','grey','all'
         * 并联查询:  'red, green, blue'   表示抽取红色, 绿色和蓝色.
    * interval: 可选参数, 表示抽每个卡池的时间,默认为10毫秒

* 示例
单色查询
```
start(100, 'red', interval=50)
```
多色查询
```
start(100, 'red, blue', interval=50)
```


* 显示英雄出现次数
```
getAmountByName(name)
```
* 页面刷新
```
refresh()
```
