import React from "react";
import "./overLay.css";

const Overlay = (props) => {
  return (
    <div className="bg_container" onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default Overlay;
