import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./app.css";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import CreateBlog from "./blog/CreateBlog";
import MainBlog from "./blog/MainBlog";
import UserBlog from "./blog/UserBlog";
import Navbar from "./utils/Navbar";
import BlogDetail from "./blog/BlogDetail";
import PersonalInfo from "./userinfo/PersonalInfo";
import PasswordInfo from "./userinfo/PasswordInfo";
import { useSelector } from "react-redux";
import AllBlogs from "./blog/AllBlogs";
import ForgotPwd from "./auth/ForgotPwd";
import ResetPwd from "./auth/ResetPwd";
import EmailSendSuccess from "./auth/EmailSendSuccess";

const App = () => {
  const currentUser = useSelector((state) => state.auth.data);

  return (
    <Router>
      {currentUser?._id ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/main" element={<MainBlog />} />
            <Route path="/main/otherblogs" element={<AllBlogs />} />
            <Route path="/main/createblog" element={<CreateBlog />} />
            <Route path="/main/userblogs" element={<UserBlog />} />
            <Route path="/main/favblogs" element={<UserBlog />} />
            <Route path="/main/blogs/:bid" element={<BlogDetail />} />
            <Route path="/main/user/userinfo" element={<PersonalInfo />} />
            <Route path="/main/user/userpassword" element={<PasswordInfo />} />
            <Route path="*" element={<Navigate to="/main" />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/blog/login" element={<Login />} />
          <Route path="/blog/signup" element={<Signup />} />
          <Route path="/blog/forgotpassword" element={<ForgotPwd />} />
          <Route path="/blog/success" element={<EmailSendSuccess />} />
          <Route path="/blog/resetpassword/:token" element={<ResetPwd />} />
          <Route path="*" element={<Navigate to="/blog/signup" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
