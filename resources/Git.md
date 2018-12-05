# Git 使用
## 如何将react项目部署到github中预览
```
// 【第一步】 安装依赖包
npm install --save-dev gh-pages

// 【第二步】 在package.json中添加命令
"scripts": {
      // ...
      "predeploy": "npm run build",
      "deploy": "gh-pages -d build"
    }

// 【第三步】 命令行中执行deploy(部署)，该命令会打包项目，并且将打包好的文件夹部署到gh-pages分支中
npm run deploy
// 【第四步】 在github中找到该repository-setting-GitHub Pages，将source设置为gh-pages，save即可
// 注意：package.json中设置打包的主页：
"homepage": "https://wuchunxu.github.io/frontendJourney/"
```

