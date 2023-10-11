import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosCreate } from "../axiosHook/axiosCreate";
import useInput from "../customhook/useInput";
import {
  updateFail,
  updateRefreshErr,
  updateStart,
  updateSuccess,
} from "../redux-store/reducer/authSlice";
import "./personalInfo.css";

const PersonalInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth);
  const imgRef = useRef();
  const [imgFile, setImgFile] = useState("");
  const [imgPreview, setImgPreview] = useState();
  const {
    change: nameChange,
    val: nameVal,
    chg: nameChg,
    inputBlurHandler: nameBlurHandler,
    inputChangeHandler: nameChangeHandler,
  } = useInput(currentUser.data.name);

  const {
    change: emailChange,
    val: emailVal,
    chg: emailChg,
    inputBlurHandler: emailBlurHandler,
    inputChangeHandler: emailChangeHandler,
  } = useInput(currentUser.data.email);

  const {
    change: bioChange,
    val: bioVal,
    chg: bioChg,
    inputBlurHandler: bioBlurHandler,
    inputChangeHandler: bioChangeHandler,
  } = useInput(currentUser.data.bio);

  let nameValid = nameVal[0]?.length > 0 || nameVal?.length > 0;
  let emailValid = emailVal[0]?.includes("@") || emailVal?.includes("@");
  let bioValid = bioVal[0]?.length > 0 && bioVal?.length < 50;

  let formIsValid = nameValid && emailValid && bioValid;

  const saveHandler = async () => {
    const form = new FormData();
    form.append("name", nameVal);
    form.append("email", emailVal);
    form.append("bio", bioVal);
    form.append("photo", imgFile);
    try {
      dispatch(updateStart());
      const data = await axiosCreate.patch("/auth/updateme", form);
      dispatch(updateSuccess(data.data.data));
      navigate("/main");
    } catch (err) {
      dispatch(updateFail(err.response.data.message));
      setTimeout(() => {
        dispatch(updateRefreshErr());
      }, 3000);
    }
  };

  useEffect(() => {
    if (imgFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImgPreview(e.target.result);
      };
      reader.readAsDataURL(imgFile);
    }
  }, [imgFile]);

  return (
    <div className="u_info_container">
      <div className="u_info_wrapper">
        {currentUser.err && (
          <h1 style={{ color: "red" }}>{currentUser.errData}</h1>
        )}
        <h4 className="u_info_title">User Information</h4>
        <div className="u_info_input_box">
          <div className="u_info_input_img">
            {imgFile ? (
              <img
                src={imgPreview}
                alt=""
                className="u_info_input_jpg"
                onClick={() => imgRef.current.click()}
              />
            ) : (
              <img
                src={`http://localhost:8000/${currentUser.data.photo}`}
                alt=""
                className="u_info_input_jpg"
                onClick={() => imgRef.current.click()}
              />
            )}
            <input
              ref={imgRef}
              onChange={(e) => setImgFile(e.target.files[0])}
              type="file"
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div className="u_info_input_box">
          <h6 className="u_info_input_label">Name</h6>

          <input
            className={!nameValid ? "u_info_input invalid" : "u_info_input"}
            value={nameVal}
            type="text"
            placeholder="example"
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
          {!nameValid && (
            <span className="auth_span">*name need to be filled.</span>
          )}
        </div>
        <div className="u_info_input_box">
          <h6 className="u_info_input_label">Email</h6>

          <input
            className={!emailValid ? "u_info_input invalid" : "u_info_input"}
            value={emailVal}
            type="text"
            placeholder="example"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {!emailValid && (
            <span className="auth_span">*email need to be filled.</span>
          )}
        </div>
        <div className="u_info_input_box">
          <h6 className="u_info_input_label">Bio</h6>

          <input
            className={!bioValid ? "u_info_input invalid" : "u_info_input"}
            value={bioVal}
            type="text"
            placeholder="example"
            onChange={bioChangeHandler}
            onBlur={bioBlurHandler}
          />
          {!bioValid && (
            <span className="auth_span">
              *bio need to be filled(words should be less than 50 words).
            </span>
          )}
        </div>
        <button
          className={!formIsValid ? "u_info_btn disable" : "u_info_btn"}
          disabled={!formIsValid}
          onClick={saveHandler}
        >
          save
        </button>
      </div>
    </div>
  );
};

export default PersonalInfo;
