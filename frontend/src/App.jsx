// react-router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// pages
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import PostPage from "./pages/PostPage";
import CreatePost from "./pages/CreatePost";
import Notifications from "./pages/Notifications";
// components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// context
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
          <Route path="/profile" element={!user ? <Navigate to="/login" /> : <Profile />} />
          <Route path="/posts/:postId" element={<PostPage />} />
          <Route path="/create" element={!user ? <Navigate to="/login" /> : <CreatePost />} />
          <Route path="/notifications" element={!user ? <Navigate to="/login" /> : <Notifications />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
