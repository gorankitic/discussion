
// react-router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// pages
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Post from "./pages/Post";
// components
import Navbar from "./components/Navbar";
// context
import { useAuthContext } from "./context/AuthContext";
// styles
import './App.css'

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/posts/:postId" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
