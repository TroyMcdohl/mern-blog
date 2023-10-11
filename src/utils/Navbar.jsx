import React from "react";
import { useState } from "react";
import "./navbar.css";
import Slidebar from "./Slidebar";

const Navbar = () => {
  const [navBtn, setNavBtn] = useState(false);

  const navBtnHandler = () => {
    setNavBtn((prev) => !prev);
  };

  return (
    <>
      <div className="nav_container">
        <div className="nav_wrapper">
          <div className="nav_left">
            <h5 className="nav_left_title">MERN BlOG</h5>
          </div>
          <div className="nav_right">
            <div className="nav_right_bar" onClick={navBtnHandler}>
              <span
                className={navBtn ? "nav_right_bars active" : "nav_right_bars"}
              ></span>
              <span
                className={navBtn ? "nav_right_bars active" : "nav_right_bars"}
              ></span>
              <span
                className={navBtn ? "nav_right_bars active" : "nav_right_bars"}
              ></span>
            </div>
          </div>
        </div>
      </div>

      <Slidebar navBtn={navBtn} setNavBtnHandler={navBtnHandler} />
    </>
  );
};

export default Navbar;
