import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useInput from "../customhook/useInput";
import "./signup.css";
import { axiosCreate } from "../axiosHook/axiosCreate";
import { useSelector, useDispatch } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFail,
} from "./../redux-store/reducer/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth);

  const {
    change: emailChange,
    val: emailVal,
    chg: emailChg,
    inputBlurHandler: emailBlurHandler,
    inputChangeHandler: emailChangeHandler,
  } = useInput();

  const {
    change: pwdChange,
    val: pwdVal,
    chg: pwdChg,
    inputBlurHandler: pwdBlurHandler,
    inputChangeHandler: pwdChangeHandler,
  } = useInput();

  let emailValid = emailChange && emailVal.includes("@");
  let pwdValid = pwdChange && pwdVal.length > 0;
  let formIsValid = emailValid && pwdValid;

  const loginHandler = async () => {
    try {
      dispatch(loginStart());
      const data = await axiosCreate.post("/auth/login", {
        email: emailVal,
        password: pwdVal,
      });

      // const data = await fetch("http://localhost:8000/api/v1/auth/login", {
      //   method: "POST",
      //   headers: { "Content-type": "application/json" },
      //   credentials: "include",
      //   body: JSON.stringify({
      //     email: emailVal,
      //     password: pwdVal,
      //   }),
      // });
      // const resData = await data.json();
      //console.log(resData)
      dispatch(loginSuccess(data.data.data));
    } catch (err) {
      dispatch(loginFail(err.response.data.message));
    }
  };

  return (
    <div className="auth_container">
      <div className="auth_wrapper">
        <div className="auth_left">
          <img
            src="https://images.pexels.com/photos/2312369/pexels-photo-2312369.jpeg?auto=compress&cs=tinysrgb&w=600"
            className="auth_left_img"
          ></img>
        </div>
        <div className="auth_form_wrapper">
          <div className="auth_form">
            {currentUser.err && (
              <h6 style={{ color: "red", fontSize: "12px" }}>
                *{currentUser.errData}
              </h6>
            )}
            <h6 className="auth_title">Login</h6>

            <div
              className={
                !emailValid && emailChg ? "auth_input notvalid" : "auth_input"
              }
            >
              <input
                className="auth_i"
                value={emailVal}
                type="text"
                placeholder="example@gmail.com"
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
              />
              {!emailValid && emailChg && (
                <span className="auth_span">*email need to be filled.</span>
              )}
            </div>
            <div
              className={
                !pwdValid && pwdChg ? "auth_input notvalid" : "auth_input"
              }
            >
              <input
                className="auth_i"
                value={pwdVal}
                type="password"
                placeholder="*******(password)"
                onChange={pwdChangeHandler}
                onBlur={pwdBlurHandler}
              />
              {!pwdValid && pwdChg && (
                <span className="auth_span">*password need to be filled.</span>
              )}
            </div>

            <div className="pwd_setting">
              <div className="r_pwd">
                <Link to="/blog/forgotpassword">remember your password</Link>
              </div>
              <div className="r_switch">
                <Link to="/blog/signup">signup</Link>
              </div>
            </div>

            <button
              className={formIsValid ? "auth_btn" : "auth_btn disable"}
              disabled={!formIsValid}
              onClick={loginHandler}
            >
              SIGNIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
