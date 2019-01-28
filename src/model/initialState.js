const initialState = {
    directory:{
        books: [
            {
                title:'JavaScript',
                children:[
                    { title:'JS性能优化' },
                    { title:'TypeScript'}
                ]
            },
            { 
                title:'前端框架',
                children:[
                    { title: 'React' },
                    { title: 'Redux' },
                    { title:'Material-UI' }
                ]
            },
            {
                title:'Node后端',
                children:[
                    { title: 'Node.js', icon: '' },
                    { title: 'Koa2', icon: '' },
                ]
            },
            {
                title:'工具',
                children:[
                    { title:'Git' },
                    { title:'Markdown' }
                ]
            },
            { title: 'HTML5', icon: '' },
            { title: '微信小程序', icon: '' },
            { title: '正则表达式', icon: '' },
        ],
        selected:'Git'
    },
    article:'',
    content:[], // 文章目录
    loading:false
    
}

export {
    initialState
}