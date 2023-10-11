import React, { useEffect, useState } from "react";
import { axiosCreate } from "../axiosHook/axiosCreate";
import DelOverlay from "../utils/DelOverlay";
import { useSelector } from "react-redux";

const BlogReview = (props) => {
  // const [showAll, setShowAll] = useState(false);
  const currentUser = useSelector((state) => state.auth.data);
  const [reviews, setReviews] = useState();
  const [delBox, setDelBox] = useState(false);
  const [delChg, setDelChg] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosCreate.get(`/blog/${props.blogId}/review`);
      setReviews(res.data.data);
    };
    fetchData();
  }, [props.chgReview, delChg]);

  const delRevVal = (val) => {
    setDelChg(val);
  };

  // const showAllHandler = () => {
  //   setShowAll((prev) => !prev);
  // };

  const rdelHandler = () => {
    setDelBox(true);
  };

  const rdelCancelHandler = (val) => {
    setDelBox(val);
  };

  return (
    <div className="b_detail_reviews">
      {reviews && reviews.length == 0 ? (
        <h6
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          No review found.
        </h6>
      ) : (
        <>
          {/* <div className="b_detail_review_img"></div>
            <div className="b_detail_review_r">
              {reviews && reviews[0]?.review}
            </div>
             */}

          {reviews &&
            reviews.map((r, i) => (
              <div
                className={
                  currentUser._id == r.user._id
                    ? "b_detail_user_hover"
                    : "b_detail_review"
                }
                key={r._id}
                onClick={currentUser._id == r.user._id ? rdelHandler : null}
              >
                {delBox && (
                  <DelOverlay
                    rid={reviews}
                    delRevVal={delRevVal}
                    delBoxHandler={rdelCancelHandler}
                  />
                )}

                <img
                  src={`http://localhost:8000/${r.user.photo}`}
                  className="b_detail_review_img"
                />
                <div className="b_detail_review_r">{r.review}</div>
              </div>
            ))}
        </>
      )}

      {/* 
      {showAll && (
        <>
          {reviews &&
            reviews.slice(1, reviews.length).map((r) => (
              <div
                className="b_detail_review"
                key={r._id}
                onClick={rdelHandler}
              >
                {delBox && (
                  <DelOverlay rid={r._id} delBoxHandler={rdelCancelHandler} />
                )}
                <div className="b_detail_review_img"></div>
                <div className="b_detail_review_r">{r.review}</div>
              </div>
            ))}
        </>
      )} */}
      {/* {showAll ? (
        <div className="seeMore_btn" onClick={showAllHandler}>
          {reviews?.length != 0 && reviews?.length > 1 && (
            <>show less comments</>
          )}
        </div>
      ) : (
        <div className="seeMore_btn" onClick={showAllHandler}>
          {reviews?.length != 0 && reviews?.length > 1 && (
            <>show all comments</>
          )}
        </div>
      )} */}
    </div>
  );
};

export default BlogReview;
