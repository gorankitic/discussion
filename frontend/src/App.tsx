// lib
import { Route, Routes } from "react-router";
// components
import ProtectedLayout from "@/components/ProtectedLayout";
import PublicLayout from "@/components/PublicLayout";
// pages
import Home from "@/pages/Home";
import SignUp from "@/pages/SignUp";
import SignIn from "@/pages/SignIn";
import VerifyEmail from "@/pages/VerifyEmail";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import Settings from "@/pages/Settings";
import PostPage from "@/pages/PostPage";
import Notifications from "@/pages/Notifications";

function App() {
    return (
        <Routes>
            <Route element={<ProtectedLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="verify-email" element={<VerifyEmail />} />
                <Route path="settings" element={<Settings />} />
                <Route path="posts/:postId" element={<PostPage />} />
                <Route path="notifications" element={<Notifications />} />
            </Route>
            <Route element={<PublicLayout />}>
                <Route path="signup" element={<SignUp />} />
                <Route path="signin" element={<SignIn />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password/:resetToken" element={<ResetPassword />} />
            </Route >
        </Routes >
    )
}

export default App;