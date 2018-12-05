# Git ä½¿ç”¨
## å¦‚ä½•å°†reacté¡¹ç›®éƒ¨ç½²åˆ°githubä¸­é¢„è§ˆ
```
// ã€ç¬¬ä¸€æ­¥ã€‘ å®‰è£…ä¾èµ–åŒ…
npm install --save-dev gh-pages

// ã€ç¬¬äºŒæ­¥ã€‘ åœ¨package.jsonä¸­æ·»åŠ å‘½ä»¤
"scripts": {
      // ...
      "predeploy": "npm run build",
      "deploy": "gh-pages -d build"
    }

// ã€ç¬¬ä¸‰æ­¥ã€‘ å‘½ä»¤è¡Œä¸­æ‰§è¡Œdeploy(éƒ¨ç½²)ï¼Œè¯¥å‘½ä»¤ä¼šæ‰“åŒ…é¡¹ç›®ï¼Œå¹¶ä¸”å°†æ‰“åŒ…å¥½çš„æ–‡ä»¶å¤¹éƒ¨ç½²åˆ°gh-pagesåˆ†æ”¯ä¸­
npm run deploy
// ã€ç¬¬å››æ­¥ã€‘ åœ¨githubä¸­æ‰¾åˆ°è¯¥repository-setting-GitHub Pagesï¼Œå°†sourceè®¾ç½®ä¸ºgh-pagesï¼Œsaveå³å¯
// æ³¨æ„ï¼špackage.jsonä¸­è®¾ç½®æ‰“åŒ…çš„ä¸»é¡µï¼š
"homepage": "https://wuchunxu.github.io/frontendJourney/"
```

