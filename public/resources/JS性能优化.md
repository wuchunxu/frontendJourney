# JavaScript性能优化
## 加载和执行
大多数浏览器使用一个进程来进行UI绘制和JavaScript脚本的执行，如果`<script></script>`标签在html文件的中间，那么`script`后面的部分必须等JavaScript脚本执行完毕才会渲染。外部链接`<script src="test.js"></script>`时，下载js文件以及执行会阻塞浏览器渲染界面。
### 脚本位置
多个script的下载和执行是“单车道模式”，也就是说必须等第一个下载并执行完毕，第二个才开始下载然后执行，依此类推，第三个、第四个...。
script不宜放在`<head></head>`中，这会阻塞浏览器解析和渲染`<body></body>`中的DOM元素。
推荐：将所有script尽可能放到`<body>`的底部，优先加载页面(文字、图片)。
>规则一：脚本应该尽可能放在底部。
### 脚本的数量
外链的脚本数量越多，http请求次数越多，性能开销越大。**单个100KB文件比4个25KB文件下载更快。**
>规则二：脚本数量应尽可能少。
### 延迟的脚本(非阻塞)
`<script src="defer.js" defer></script>`中`defer`表示该脚本不会修改DOM，因此可以延迟执行，不必阻塞等待。
具体的，defer可以让script下载时，其他文件同时加载，当该`script`加载完毕后，等待，并在`window.onload`事件触发之前那一刻执行。