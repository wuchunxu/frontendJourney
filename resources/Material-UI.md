# Material-UI
## 开始使用
### 安装
```
npm install @material-ui/core --save
npm install @material-ui/icons --save
```
### meta标签
```
<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-widthshrink-to-fit=no"/>
```
### 重置CSS样式组件
```
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

function MyApp() {
  return (
    <React.Fragment>
      <CssBaseline />
      {/* APP放在这里 */}
    </React.Fragment>
  );
}

export default MyApp;
```
## 样式
### 颜色系统
#### 术语
**调色板(*Palette*)**是颜色的集合，包括色调(hues)和色度(shades)。
色调包括：**red、pink、purple、deepPurple、indigo、blue、lightblue、cyan、teal、green、lightGreen、lime、yellow、amber、orange、deepOrange、brown、grey、blueGray**
#### 定制样式
