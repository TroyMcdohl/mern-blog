import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../customhook/useInput";
import "./signup.css";
import { axiosCreate } from "../axiosHook/axiosCreate";

const ForgotPwd = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [errData, setErrData] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    change: emailChange,
    val: emailVal,
    chg: emailChg,
    inputBlurHandler: emailBlurHandler,
    inputChangeHandler: emailChangeHandler,
  } = useInput();

  let emailValid = emailChange && emailVal.includes("@");
  let formIsValid = emailValid;

  const forgotHandler = async () => {
    try {
      setLoading(true);
      const data = await axiosCreate.post("/auth/forgotpassword", {
        email: emailVal,
      });
      setLoading(false);
      navigate("/blog/success");
    } catch (err) {
      setLoading(false);
      setErr(true);
      setErrData(err.response.data.message);
      setTimeout(() => {
        setErr(false);
      }, 3000);
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
            {loading && (
              <h6 style={{ color: "yellow", fontSize: "12px" }}>
                processing please wait.....
              </h6>
            )}
            {err && (
              <h6 style={{ color: "red", fontSize: "12px" }}>*{errData}</h6>
            )}
            <h6 className="auth_title">ForgotPwd</h6>

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

            <div className="pwd_setting">
              <div className="r_pwd">
                <Link to="/blog/login">signin</Link>
              </div>
              <div className="r_switch">
                <Link to="/blog/signup">signup</Link>
              </div>
            </div>

            <button
              className={formIsValid ? "auth_btn" : "auth_btn disable"}
              disabled={!formIsValid}
              onClick={forgotHandler}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPwd;
