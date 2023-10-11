import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { axiosCreate } from "../axiosHook/axiosCreate";
import useInput from "../customhook/useInput";
import {
  signupFail,
  signupStart,
  signupSuccess,
} from "../redux-store/reducer/signupSlice";
import "./signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.signup);

  const {
    change: nameChange,
    val: nameVal,
    chg: nameChg,
    inputBlurHandler: nameBlurHandler,
    inputChangeHandler: nameChangeHandler,
  } = useInput();

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

  const {
    change: conPwdChange,
    val: conPwdVal,
    chg: conPwdChg,
    inputBlurHandler: conPwdBlurHandler,
    inputChangeHandler: conPwdChangeHandler,
  } = useInput();

  let nameValid = nameChange && nameVal.length > 0;
  let emailValid = emailChange && emailVal.includes("@");
  let pwdValid = pwdChange && pwdVal.length > 0;
  let conPwdValid = conPwdChange && conPwdVal.length > 0;

  let formIsValid = nameValid && emailValid && pwdValid && conPwdValid;

  const signupHandler = async () => {
    try {
      dispatch(signupStart());
      const data = await axiosCreate.post("/auth/signup", {
        name: nameVal,
        email: emailVal,
        password: pwdVal,
        confirmPassword: conPwdVal,
      });

      dispatch(signupSuccess(data.data.data));
      navigate("/blog/login");
    } catch (err) {
      dispatch(signupFail());
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
            <h6 className="auth_title">Signup</h6>
            <div
              className={
                !nameValid && nameChg ? "auth_input notvalid" : "auth_input"
              }
            >
              <input
                className="auth_i"
                value={nameVal}
                type="text"
                placeholder="example"
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
              />
              {!nameValid && nameChg && (
                <span className="auth_span">*name need to be filled.</span>
              )}
            </div>
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
            <div
              className={
                !conPwdValid && conPwdChg ? "auth_input notvalid" : "auth_input"
              }
            >
              <input
                className="auth_i"
                value={conPwdVal}
                type="password"
                placeholder="*******(confirmpassword)"
                onChange={conPwdChangeHandler}
                onBlur={conPwdBlurHandler}
              />
              {!conPwdValid && conPwdChg && (
                <span className="auth_span">
                  *confirmPassword need to be filled.
                </span>
              )}
            </div>

            <div className="pwd_setting">
              <div className="r_switch">
                <Link to="/blog/login">signin</Link>
              </div>
            </div>

            <button
              className={formIsValid ? "auth_btn" : "auth_btn disable"}
              disabled={!formIsValid}
              onClick={signupHandler}
            >
              SIGNUP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
