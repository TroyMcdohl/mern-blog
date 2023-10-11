import React, { useState } from "react";
import "./passwordInfo.css";
import useInput from "../customhook/useInput";
import { axiosCreate } from "../axiosHook/axiosCreate";
import { useNavigate } from "react-router-dom";

const PasswordInfo = () => {
  const navigate = useNavigate();
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
    change: newPwdChange,
    val: newPwdVal,
    chg: newPwdChg,
    inputBlurHandler: newPwdBlurHandler,
    inputChangeHandler: newPwdChangeHandler,
  } = useInput();

  const {
    change: conPwdChange,
    val: conPwdVal,
    chg: conPwdChg,
    inputBlurHandler: conPwdBlurHandler,
    inputChangeHandler: conPwdChangeHandler,
  } = useInput();

  let pwdValid = pwdChange && pwdVal.length > 0;
  let newPwdValid = newPwdChange && newPwdVal.length > 0;
  let conPwdValid = conPwdChange && conPwdVal.length > 0;

  let formIsValid = !pwdValid || !newPwdValid || !conPwdValid;

  const pwdHandler = async () => {
    try {
      const data = await axiosCreate.patch("/auth/updatepassword", {
        oldPassword: pwdVal,
        newPassword: newPwdVal,
        confirmPassword: conPwdVal,
      });

      navigate("/main");
    } catch (err) {
      setErr(true);
      setErrData(err.response.data.message);
      setTimeout(() => {
        setErr(false);
      }, 3000);
    }
  };

  return (
    <div className="u_info_container">
      <div className="u_info_wrapper">
        {err && <h6 style={{ color: "red" }}>*{errData}</h6>}
        <h4 className="u_info_title">Password Information</h4>
        <div className="u_info_input_box">
          <h6 className="u_info_input_label">Old Password</h6>

          <input
            className={
              !pwdValid && pwdChg ? "u_info_input invalid" : "u_info_input"
            }
            value={pwdVal}
            type="password"
            placeholder="********"
            onChange={pwdChangeHandler}
            onBlur={pwdBlurHandler}
          />
          {!pwdValid && pwdChg && (
            <span className="auth_span">*old password need to be filled.</span>
          )}
        </div>
        <div className="u_info_input_box">
          <h6 className="u_info_input_label">New Password</h6>

          <input
            className={
              !newPwdValid && newPwdChg
                ? "u_info_input invalid"
                : "u_info_input"
            }
            value={newPwdVal}
            type="password"
            placeholder="********"
            onChange={newPwdChangeHandler}
            onBlur={newPwdBlurHandler}
          />
          {!newPwdValid && newPwdChg && (
            <span className="auth_span">*new password need to be filled.</span>
          )}
        </div>
        <div className="u_info_input_box">
          <h6 className="u_info_input_label">Confirm Password</h6>

          <input
            className={
              !conPwdValid && conPwdChg
                ? "u_info_input invalid"
                : "u_info_input"
            }
            value={conPwdVal}
            type="password"
            placeholder="********"
            onChange={conPwdChangeHandler}
            onBlur={conPwdBlurHandler}
          />
          {!conPwdValid && conPwdChg && (
            <span className="auth_span">
              *confirm password need to be filled
            </span>
          )}
        </div>
        <button
          className={formIsValid ? "u_info_btn disable" : "u_info_btn"}
          disabled={formIsValid}
          onClick={pwdHandler}
        >
          save
        </button>
      </div>
    </div>
  );
};

export default PasswordInfo;
