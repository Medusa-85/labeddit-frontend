export const goToLoginPage = (navigator) => {
    navigator('/')
}
export const goToPostsPage = (navigator) => {
    navigator('/posts')
}
export const goToReplyPage = (navigator, id) => {
    navigator(`/reply/${id}`)
}
export const goToSignupPage = (navigator) => {
    navigator('/signup')
}
