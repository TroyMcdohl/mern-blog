import React, { useEffect } from "react";
import { useState } from "react";
import "./blogDetail.css";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { useParams } from "react-router-dom";
import { axiosCreate } from "../axiosHook/axiosCreate";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import {
  blogLike,
  blogSuccess,
  blogUnLike,
} from "../redux-store/reducer/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import BlogReview from "./BlogReview";
import BackspaceIcon from "@mui/icons-material/Backspace";
import DelOverlay from "../utils/DelOverlay";

const BlogDetail = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.data);
  const [reviewVal, setReviewVal] = useState("");
  const [chgLike, setChgLike] = useState(false);
  const [chgReview, setChgReview] = useState(false);
  const [data, setData] = useState(false);
  const user = useSelector((state) => state.auth.data);
  const [delBox, setDelBox] = useState(false);
  const [ratingVal, setRatingVal] = useState(4);

  // const location = useLocation();
  const blogId = useParams().bid;
  // const blogValues = location.state.blog;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogValu = await axiosCreate.get(`/blog/${blogId}`);
        setData(true);
        dispatch(blogSuccess(blogValu.data.data));
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const blogValue = useSelector((state) => state.blog.data);

  const likeHandler = async () => {
    try {
      const data = await axiosCreate.patch(`/blog/like/${blogValue?._id}`);
      const res = data.data.data;
      dispatch(blogLike(res));
      setChgLike(true);
    } catch (err) {
      console.log(err);
    }
  };

  const unlikeHandler = async () => {
    try {
      const data = await axiosCreate.patch(`/blog/unlike/${blogValue?._id}`);

      dispatch(blogUnLike(data.data.data));
      setChgLike(false);
    } catch (err) {
      console.log(err);
    }
  };

  const reviewChangeHandler = (e) => {
    setReviewVal(e.target.value);
  };

  const reviewHandler = async () => {
    try {
      await axiosCreate.post(`/blog/${blogValue?._id}/review`, {
        review: reviewVal,
        rating: ratingVal,
      });

      setChgReview((prev) => !prev);
      setReviewVal("");
    } catch (err) {
      console.log(err);
    }
  };

  const blogDelHandler = () => {
    setDelBox(true);
  };

  const rdelCancelHandler = (val) => {
    setDelBox(val);
  };

  const delRevVal = () => {};

  const ratingChangeHandler = (e) => {
    setRatingVal(e.target.value);
  };

  return (
    <div className="b_detail_container">
      {delBox && (
        <DelOverlay
          blogID={blogValue._id}
          delRevVal={delRevVal}
          delBoxHandler={rdelCancelHandler}
        />
      )}

      {data && (
        <div className="b_detail_wrapper">
          <div className="b_detail_top">
            <div className="b_detail_author">
              written by {blogValue?.user.name}
            </div>
            <h3 className="b_detail_title">{blogValue?.title}</h3>
            <div className="b_detail_date">
              {new Date(blogValue?.createdAt).toLocaleString()}
              {currentUser._id == blogValue.user._id && (
                <div className="del_blog_icon" onClick={blogDelHandler}>
                  <BackspaceIcon />
                </div>
              )}
            </div>
          </div>

          <div className="b_detail_bot">
            <div className="b_detail_b_top">
              <div className="b_detail_blog_img">
                <img
                  src={`http://localhost:8000/${blogValue?.photo}`}
                  className="b_detail_blog_jpg"
                ></img>
              </div>
              <div className="b_detail_blog_content">{blogValue?.content}</div>
              <hr style={{ height: "2px", backgroundColor: "black" }} />
            </div>
            <div className="b_detail_b_bot">
              <h6 className="b_detail_b_fav">
                {blogValue.like.some((s) => s._id == user._id) ? (
                  <ThumbUpAltIcon onClick={unlikeHandler} />
                ) : (
                  <ThumbUpOffAltIcon onClick={likeHandler} />
                )}
                <span>{blogValue?.like.length} </span>
              </h6>
              <div className="b_detail_r">
                <input
                  placeholder="write something feel about this blog"
                  type="text"
                  className="b_detail_r_create"
                  onChange={reviewChangeHandler}
                  value={reviewVal}
                />
                <label htmlFor="ratinglabel">rating</label>
                <select name="ratinglabel" id="" onChange={ratingChangeHandler}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="b_detail_r_btn" onClick={reviewHandler}>
                  Add
                </button>
              </div>
            </div>

            <BlogReview blogId={blogValue?._id} chgReview={chgReview} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
