import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  const token = useParams().token;
  const [err, setErr] = useState(false);
  const [errData, setErrData] = useState(null);

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

  let pwdValid = pwdChange && pwdVal.length > 0;
  let conPwdValid = conPwdChange && conPwdVal.length > 0;

  let formIsValid = pwdValid && conPwdValid;

  const resetPwdHandler = async () => {
    try {
      const data = await axiosCreate.patch(`/auth/resetpassword/${token}`, {
        password: pwdVal,
        confirmPassword: conPwdVal,
      });

      navigate("/blog/login");
    } catch (err) {
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
            {err && (
              <h6 style={{ color: "red", fontSize: "12px" }}>*{errData}</h6>
            )}
            <h6 className="auth_title">Reset Password</h6>

            <div
              className={
                !pwdValid && pwdChg ? "auth_input notvalid" : "auth_input"
              }
            >
              <input
                className="auth_i"
                value={pwdVal}
                type="password"
                placeholder="*******(newpassword)"
                onChange={pwdChangeHandler}
                onBlur={pwdBlurHandler}
              />
              {!pwdValid && pwdChg && (
                <span className="auth_span">
                  *newpassword need to be filled.
                </span>
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

            <button
              className={formIsValid ? "auth_btn" : "auth_btn disable"}
              disabled={!formIsValid}
              onClick={resetPwdHandler}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
