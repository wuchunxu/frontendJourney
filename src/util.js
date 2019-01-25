
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
            treatment: target => `<span class="code">${target.slice(1,-1)}</span>`
        }

    ].reduce(
        (prev, { regExp, treatment }) => prev.replace(regExp, treatment)
        , inside);

}
function safe(inside){
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
            const { isLiNotClosed } = controller;
            let result = `${isLiNotClosed ? '</li>' : ''}
                    <li class="chapter-item paper">
                        <h2 class="article-h2">${text.replace(this.regExp, '')}</h2>`;
            controller.isLiNotClosed = !isLiNotClosed;
            return result;
        }
    },
    {
        regExp: /^#{3}\s+/,
        convert(text) {
            return `<h3 class="article-h3">${text.replace(this.regExp, '')}</h3>`;
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
        isCode:true
    },
    {
        regExp:/^>/, // 匹配提示
        convert(text){
            return `<blockquote class="hint">${text.substring(1)}</blockquote>`
        }
    },
    {
        regExp: /^\s+$/,//匹配空行
        convert(){
            return '';
        }
    },
    {
        regExp:/(\s\|\s){1}/,
        isTable:true,
    }
];

/*
    结构转换
    包括：h1,h2,h3,h4,h5,h6,pre
*/
function markdown2html(markdownText) {
    
    const cut2Lines = text => text.split(/\n/); // 切成一行一行，如果文本太大可能有性能问题！
    
    const isMatched = (text, regExp) => text.search(regExp) > -1; // 指定文本是否匹配给定的正则表达式

    const text2Tr = text => '\n\t<tr>'+text.split('|').map(td=>'<td>'+td+'</td>').join('') +'</tr>';

    const stateController = { // 状态机
        isLiNotClosed: false,
        isInPre: false,
        isInTable:false
    };
    
    return cut2Lines(markdownText) // markdown文本按行进行切割
        .map(line => { // 逐行将markdown翻译成html
            const regExp = regExps.find(({ regExp }) => isMatched(line, regExp)); // 查找匹配到的正则
            // console.log(regExp)
            
            if (regExp) {
                if(regExp.isTable){ // 检测到table元素
                    //console.log('table');
                    if(stateController.isInTable){
                        // 在table里
                        return text2Tr(line);
                    }else{
                        // 当前还不在table里，表明进入table
                        // console.log('检测到table并且还没进入');
                        stateController.isInTable = true;
                        return `\n<table class="material-table">${text2Tr(line)}`;
                    }
                }else{ // 未检测到table元素
                    if(stateController.isInTable){
                        stateController.isInTable = false;
                        return `\n</table>${regExp.convert(line, stateController)}`;
                    }else{
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
}
// module.exports = {
//     markdown2html
// }
export {
    markdown2html
};