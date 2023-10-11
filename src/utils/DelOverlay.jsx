import React, { useState } from "react";
import { useEffect } from "react";
import { axiosCreate } from "../axiosHook/axiosCreate";
import "./delOverlay.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DelOverlay = (props) => {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [delRev, setDelRev] = useState(false);
  const currentUser = useSelector((state) => state.auth.data);
  useEffect(() => {
    props.delBoxHandler(!click);
    props.delRevVal(delRev);
  }, [click, delRev]);

  const userReview = props.rid
    ? props.rid.filter((r) => r.user._id == currentUser._id)
    : props.blogID;

  const url = props.rid
    ? `/review/${userReview[0]._id}`
    : `/blog/${props.blogID}`;

  const deleteHandler = async () => {
    try {
      await axiosCreate.delete(url);
      setDelRev((prev) => !prev);
      setClick(true);
      if (props.blogID) {
        navigate("/main/userblogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d_overlay_container">
      <div className="d_overlay_wrapper">
        <div className="d_overlay_wrap">
          <div className="d_overlay_top">
            <h6 className="del_title">Are you sure want to delete?</h6>
          </div>
          <div className="d_overlay_bot">
            <div className="d_overlay_bot_left">
              <button className="cancel_btn" onClick={() => setClick(true)}>
                cancel
              </button>
            </div>
            <div className="d_overlay_bot_right">
              <button className="del_btn" onClick={deleteHandler}>
                delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DelOverlay;
