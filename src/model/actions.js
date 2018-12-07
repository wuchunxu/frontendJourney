
// Action 生成器
const selectBook = (title) => {
    return {
        type:'SELECT_BOOK',
        title
    }
}
const updateArticle = (article)=>{
    return {
        type:'UPDATE_ARTICLE',
        article
    }
}
const setLoading = (state)=>{
    return {
        type:'UPDATE_LOADING',
        loading:state
    }
}
export {
    selectBook,updateArticle,setLoading
}