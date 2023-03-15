import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
    LoginPage,
    PostsPage,
    ReplyContentPage,
    SignupPage
} from "../pages"

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/posts" element={<PostsPage/>} />
                <Route path="/reply-content" element={<ReplyContentPage/>} />
                <Route path="/signup" element={<SignupPage/>} />
            </Routes>
        </BrowserRouter>
    )
}