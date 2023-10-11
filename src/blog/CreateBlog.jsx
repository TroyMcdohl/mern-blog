import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosCreate } from "../axiosHook/axiosCreate";
import useInput from "../customhook/useInput";
import "./createblog.css";

const CreateBlog = () => {
  const navigate = useNavigate();
  const imgRef = useRef();
  const [imgFile, setImgFile] = useState();
  const [imgPreview, setImgPreview] = useState();

  const {
    change: blogTitleChange,
    val: blogTitleVal,
    chg: blogTitleChg,
    inputBlurHandler: blogTitleBlurHandler,
    inputChangeHandler: blogTitleChangeHandler,
  } = useInput();

  const {
    change: blogContentChange,
    val: blogContentVal,
    chg: blogContentChg,
    inputBlurHandler: blogContentBlurHandler,
    inputChangeHandler: blogContentChangeHandler,
  } = useInput();

  let blogTitleValid = blogTitleChange && blogTitleVal.length > 0;
  let blogContentValid = blogContentChange && blogContentVal.length > 0;
  let formIsValid = blogTitleValid && blogContentValid;

  const blogCreateHandler = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", blogTitleVal);
    form.append("content", blogContentVal);
    form.append("photo", imgFile);
    try {
      const data = await axiosCreate.post("/blog", form);
      console.log(data);
      navigate("/main/blogs");
    } catch (err) {
      console.log(err);
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
    <div className="blog_container">
      <div className="blog_wrapper">
        <form className="blog_form">
          <div className="blog_input_box">
            <div className="blog_form_input">
              <input
                className="blog_title"
                value={blogTitleVal}
                type="text"
                placeholder="blog title"
                onChange={blogTitleChangeHandler}
                onBlur={blogTitleBlurHandler}
              />
              {!blogTitleValid && blogTitleChg && (
                <span className="auth_span">
                  *blog title need to be filled.
                </span>
              )}
              <textarea
                className="blog_textarea"
                value={blogContentVal}
                type="text"
                placeholder="write blog here"
                onChange={blogContentChangeHandler}
                onBlur={blogContentBlurHandler}
              />
              {!blogContentValid && blogContentChg && (
                <span
                  style={{
                    position: "absolute",
                    top: "25%",
                    color: "red",
                    fontSize: "12px",
                  }}
                >
                  *blog content need to be filled.
                </span>
              )}
            </div>
            <div className="blog_img">
              <h4 className="blog_img_title">Add Photo</h4>
              {imgFile ? (
                <img
                  src={imgPreview}
                  className="blog_img_box"
                  onClick={() => imgRef.current.click()}
                />
              ) : (
                <div
                  className="blog_img_box"
                  onClick={() => imgRef.current.click()}
                >
                  +
                </div>
              )}
              <input
                ref={imgRef}
                onChange={(e) => setImgFile(e.target.files[0])}
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="blog_btns">
            <button className="blog_form_btn" onClick={blogCreateHandler}>
              create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
