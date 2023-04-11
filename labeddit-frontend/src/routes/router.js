import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
    LoginPage,
    PostsPage,
    ReplyPage,
    SignupPage
} from "../pages"

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>} />
                <Route path="/posts" element={<PostsPage/>} />
                <Route path="/posts/:id" element={<ReplyPage/>} />
                <Route path="/signup" element={<SignupPage/>} />
            </Routes>
        </BrowserRouter>
    )
}