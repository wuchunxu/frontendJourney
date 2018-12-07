const initialState = {
    directory:{
        books: [
            { title: 'Git', icon: '' },
            { title: 'HTML5', icon: '' },
            { title: 'React', icon: '' },
            { title: 'Redux', icon: '' },
            { title: 'Markdown', icon: '' },
            { title: 'Material-UI', icon: '' },
            { title: '微信小程序', icon: '' },
            { title: '正则表达式', icon: '' },
            { title: 'JS性能优化', icon: '' }
        ],
        selected:'Git'
    },
    article:'',
    loading:false
    
}

export {
    initialState
}