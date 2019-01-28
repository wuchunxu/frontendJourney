const select = (state = '请从左侧边栏选择笔记', action) => {
    switch (action.type) {
        case 'SELECT_BOOK':
            return action.title;
        default:
            return state;
    }
}
const directory = (state = {}, action) => {
    switch (action.type) {
        case 'SELECT_BOOK':
            return {
                ...state,
                selected: select(state.selected, action)
            }
        default:
            return state
    }
}
const article = (state = '选择一篇文章', action) => {
    switch (action.type) {
        case 'UPDATE_ARTICLE':
            return action.article;
        default:
            return state;
    }
}

const loading = (state = false, { type, loading }) => {
    switch (type) {
        case 'UPDATE_LOADING':
            return loading;
        default: return state;
    }
}


export {
    directory, article, loading
}