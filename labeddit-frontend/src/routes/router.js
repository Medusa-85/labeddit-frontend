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
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/posts" element={<PostsPage/>} />
                <Route path="/reply" element={<ReplyPage/>} />
                <Route path="/signup" element={<SignupPage/>} />
            </Routes>
        </BrowserRouter>
    )
}

//<Header />