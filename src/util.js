
let content = [];
/*
    非结构转换（行内部样式转换），包括字体加粗和倾斜
*/
function insideConvert(inside) {
    return [
        {
            regExp: /</g, // 匹配 < , （注意：必须放在第一个）
            treatment: () => '&lt;'
        },
        {
            regExp: /\*{2}\S+\*{2}/g, // 匹配加粗
            treatment: target => `<strong>${target.slice(2, -2)}</strong>`
        },
        {
            regExp: /\*{1}\S+\*{1}/g, //匹配斜体--> <em></em>
            treatment: target => `<em>${target.slice(1, -1)}</em>`
        },
        {
            regExp: /`{1}.*?`{1}/g, //匹配文字内嵌的代码
            treatment: target => `<span class="code">${target.slice(1, -1)}</span>`
        }

    ].reduce(
        (prev, { regExp, treatment }) => prev.replace(regExp, treatment)
        , inside);

}
function safe(inside) {
    return [{
        regExp: /</g, // 匹配 < , （注意：必须放在第一个）
        treatment: () => '&lt;'
    }].reduce(
        (prev, { regExp, treatment }) => prev.replace(regExp, treatment)
        , inside);
}
/*
    正则转换配置
*/
const regExps = [
    {
        regExp: /^#{1}\s+/,
        convert(text) {
            // return `<ul class="books"><h1 class="article-h1">${text.replace(/^#\s+/, '')}</h1>`
            return `<ul class="books">`
        }
    },
    {
        regExp: /^#{2}\s+/,
        convert(text, controller) {
            const { isInLi } = controller;
            let title = text.replace(this.regExp, '');
            //title = title.replace(/^\s+|\s+$/g, ''); // 去除收尾空格
            content.push({
                title
            });
            let result = `${isInLi ? '</li>' : ''}
                    <li class="chapter-item paper">
                        <h2 class="article-h2"><a id="${title}">${title}</a></h2>`;
            controller.isInLi = true;
            return result;
        }
    },
    {
        regExp: /^#{3}\s+/,
        convert(text,stateController) {
            let title_h3 = text.replace(this.regExp, '');
            
            if(stateController.isInLi){
                if(title_h3==='Store'){
                    console.log(111)
                }
                if(content[content.length-1].children){
                    content[content.length-1].children.push({title:title_h3});
                }else{
                    content[content.length-1].children = [{title:title_h3}];
                }
            }
            return `<h3 class="article-h3">
                        <a id=${title_h3}>${title_h3}</a>
            </h3>`;
        }
    },
    {
        regExp: /^#{4}\s+/,
        convert(text) {
            return `<h4 class="article-h4">${text.replace(this.regExp, '')}</h4>`;
        }
    },
    {
        regExp: /^#{5}\s+/,
        convert(text) {
            return `<h5 class="article-h5">${text.replace(this.regExp, '')}</h5>`;
        }
    },
    {
        regExp: /^#{6}\s+/,
        convert(text) {
            return `<h6 class="article-h6">${text.replace(this.regExp, '')}</h6>`;
        }
    },
    {
        regExp: /^`{3}\s{0,}/, // 匹配代码片段
        convert(text, controller) {
            const { isInPre } = controller;
            let result = isInPre ? '</code></pre>' : '<pre><code>';//<pre class="code">
            controller.isInPre = !isInPre;
            return result;
        },
        isCode: true
    },
    {
        regExp: /^>/, // 匹配提示
        convert(text) {
            return `<blockquote class="hint">${text.substring(1)}</blockquote>`
        }
    },
    {
        regExp: /^\s+$/,//匹配空行
        convert() {
            return '';
        }
    },
    {
        regExp: /(\s\|\s){1}/,
        isTable: true,
    }
];


function markdown2html(markdownText) {
    content = [];

    const cut2Lines = text => text.split(/\n/); // 切成一行一行，如果文本太大可能有性能问题！
    const isMatched = (text, regExp) => text.search(regExp) > -1; // 指定文本是否匹配给定的正则表达式

    const text2Tr = text => '\n\t<tr>' + text.split('|').map(td => '<td>' + td + '</td>').join('') + '</tr>';

    const stateController = { // 状态机
        isInLi: false,
        isInPre: false,
        isInTable: false
    };
    const html = cut2Lines(markdownText) // markdown文本按行进行切割
        .map(line => { // 逐行将markdown翻译成html
            // regExps中的正则是互斥的，它表示结构性，因此，最多只能匹配到一次
            if(!stateController.isInPre){
                line = line.replace(/^\s+|\s+$/g, ''); // 去除收尾空格
            }
            const regExp = regExps.find(({ regExp }) => isMatched(line, regExp)); // 查找匹配到的正则
            if (regExp) {
                // 如果匹配到正则
                if (regExp.isTable) { // 该正则表明是table元素
                    
                    if (stateController.isInTable) { 
                        return text2Tr(line); // 在table里，将该行转换成<tr><td></td></tr>
                    } else {
                        // 当前还不在table里，那么返回一个表格的头
                        stateController.isInTable = true;
                        return `\n<table class="material-table">${text2Tr(line)}`;
                    }
                } else { // 未检测到table元素
                    if (stateController.isInTable) { //但状态还在table里，说明table应该结束了
                        stateController.isInTable = false; // 状态显示结束
                        return `\n</table>${regExp.convert(line, stateController)}`; // html中结束table
                    } else { 
                        stateController.isInTable = false;
                        return regExp.convert(line, stateController);
                    }
                }
            } else { //未有正则匹配成功 --> 普通文本  --> 进一步匹配并修改行内部样式，如加粗、倾斜
                return stateController.isInPre ?
                    safe(line) :
                    `<p class="article-p">${insideConvert(line)}</p>`;
            }
        }).join('\n') + '</li></ul>';

    return {
        html, content
    }

}
// module.exports = {
//     markdown2html
// }

export {
    markdown2html
};