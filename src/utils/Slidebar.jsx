import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Overlay from "./Overlay";
import "./slideBar.css";

const Slidebar = (props) => {
  const navigate = useNavigate();

  return (
    <>
      {props.navBtn && <Overlay onClick={props.setNavBtnHandler} />}
      <div
        className={props.navBtn ? "slide_container active" : "slide_container"}
      >
        <div className="slide_wrapper">
          <ul className="slide_items">
            <Link to="/">
              <li className="slide_item" onClick={props.setNavBtnHandler}>
                Home
              </li>
            </Link>
            <Link to="/main/otherblogs">
              <li className="slide_item" onClick={props.setNavBtnHandler}>
                Blogs
              </li>
            </Link>
            <Link to="/about">
              <li className="slide_item" onClick={props.setNavBtnHandler}>
                About
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Slidebar;
