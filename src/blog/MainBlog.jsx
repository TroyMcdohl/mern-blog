import React, { useEffect, useRef, useState } from "react";
import "./mainBlog.css";
import Chart from "../chat/Chat";
import Circlechart from "../chat/Circlechart";
import { Link, useNavigate } from "react-router-dom";
import { axiosCreate } from "../axiosHook/axiosCreate";
import {
  logoutStart,
  logoutSuccess,
  logoutFail,
} from "../redux-store/reducer/authSlice";
import { useDispatch, useSelector } from "react-redux";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const MainBlog = () => {
  const currentUser = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createBlog, setCreateBlog] = useState(false);
  const [favBlog, setFavBlog] = useState(false);
  const [myBlog, setMyBlog] = useState(false);
  const [blogs, setBlogs] = useState(null);
  const [current, setCurrent] = useState(0);
  const [avgRating, setAvgRating] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axiosCreate.get("/blog/userblogs");
      setBlogs(data.data.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axiosCreate.get("/review/userblogs/reviews");
      setAvgRating(data.data.data);
    };
    fetchData();
  }, []);

  const logoutHandler = async () => {
    try {
      dispatch(logoutStart());
      await axiosCreate.patch("/auth/logout");

      dispatch(logoutSuccess());
    } catch (err) {
      dispatch(logoutFail());
    }
  };

  const length = blogs?.length;

  return (
    <div className="lg:container w-screen mx-auto main_blog_container">
      <div className="flex lg:flex-row flex-col justify-center  items-center lg:h-1/2 h-screen">
        <div className="lg:w-1/2 w-full h-full">
          <div className="w-full lg:h-1/2 h-1/3 flex ">
            <div className="flex justify-center items-center w-1/3 h-full">
              <img
                src={`http://localhost:8000/${currentUser.photo}`}
                className="cursor-pointer lg:w-1/2 lg:h-2/3 w-1/2 h-1/3 bg-violet-800 rounded-full object-cover"
              ></img>
            </div>
            <div className="lg:w-2/3 w-full  h-full flex">
              <div className="w-1/3  flex flex-col justify-evenly items-center">
                <h3>Name - </h3>
                <h3>Email - </h3>
                <h3>Bio - </h3>
              </div>
              <div className="w-2/3  flex flex-col justify-evenly ">
                <h3>{currentUser.name}</h3>
                <h3>{currentUser.email}</h3>
                <h3>{currentUser.bio}</h3>
              </div>
            </div>
          </div>
          <div className="flex lg:flex-row flex-col w-full lg:h-1/2 h-1/3">
            <div className=" h-full flex justify-center items-center w-2/3">
              <div className="w-full  mx-auto">
                <Chart />
              </div>
            </div>
            <div className="lg:w-1/3 w-full  h-full flex justify-center items-center">
              <Circlechart />
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 w-full  h-full">
          <div className="w-full  h-1/2 flex">
            <div className="w-1/3 flex justify-center items-center">
              <div
                onMouseOver={() => setCreateBlog(true)}
                onMouseLeave={() => setCreateBlog(false)}
                className="border-dashed rounded border-4 border-blue-500 lg:h-5/6 h-2/3 w-5/6 cursor-pointer rounded"
              >
                {createBlog ? (
                  <h6
                    onClick={() => navigate("/main/createblog")}
                    className="text-slate-400 transition-all ease-in delay-1  flex text-lg justify-center items-center h-full"
                  >
                    Add your blog
                  </h6>
                ) : (
                  <h6 className=" transition-all ease-in delay-1 flex text-xl justify-center items-center h-full">
                    +
                  </h6>
                )}
              </div>
            </div>
            <div className="w-1/3 flex justify-center items-center">
              <div
                onMouseOver={() => setFavBlog(true)}
                onMouseLeave={() => setFavBlog(false)}
                className="relative border rounded border-4 border-blue-500 lg:h-5/6 h-2/3 w-5/6 cursor-pointer rounded"
              >
                <img
                  src="https://images.pexels.com/photos/1510659/pexels-photo-1510659.jpeg?auto=compress&cs=tinysrgb&w=600"
                  className={
                    favBlog
                      ? "opacity-50 transition-all ease-in delay-1 h-full w-full bg-green-300"
                      : " transition-all ease-in delay-1 h-full w-full bg-green-300"
                  }
                  alt=""
                />
                {favBlog && (
                  <span
                    onClick={() => navigate("/main/favblogs")}
                    className="absolute top-0 left-0 right-0 font-bold transition-all ease-in delay-1 flex text-md justify-center items-center h-full"
                  >
                    Favorite Blog
                  </span>
                )}
              </div>
            </div>

            <div className="w-1/3 flex justify-center items-center">
              <div
                onMouseOver={() => setMyBlog(true)}
                onMouseLeave={() => setMyBlog(false)}
                className="border relative rounded border-4 border-blue-500 lg:h-5/6 h-2/3 w-5/6 cursor-pointer rounded"
              >
                <img
                  src=" https://images.pexels.com/photos/704940/pexels-photo-704940.jpeg?auto=compress&cs=tinysrgb&w=600"
                  className={
                    myBlog
                      ? "opacity-50 transition-all ease-in delay-1 h-full w-full bg-green-300"
                      : " transition-all ease-in delay-1 h-full w-full bg-green-300"
                  }
                  alt=""
                />
                {myBlog && (
                  <span
                    className="absolute top-0 left-0 right-0 font-bold transition-all ease-in delay-1 flex text-md justify-center items-center h-full"
                    onClick={() => navigate("/main/userblogs")}
                  >
                    Your Blog
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="w-full  h-1/2  flex justify-evenly items-center">
            <h3 className="transition-all ease-in delay-1 hover:text-blue-500 hover:text-xl lg:text-lg text-md font-bold  cursor-pointer">
              <Link to="/main/user/userinfo">ProfileSetting</Link>
            </h3>
            <h3 className="transition-all ease-in delay-1 hover:text-blue-500 hover:text-xl lg:text-lg text-md font-bold  cursor-pointer">
              <Link to="/main/user/userpassword">Password Setting</Link>
            </h3>
            <h3
              className="transition-all ease-in delay-1 hover:text-blue-500 hover:scale-110 lg:text-lg text-md font-bold cursor-pointer "
              onClick={logoutHandler}
            >
              Logout
            </h3>
          </div>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col justify-center items-center lg:h-1/2 h-screen">
        <div className="lg:w-1/2 w-screen h-1/2  lg:h-full flex justify-center items-center">
          <div className="avg_blog_container">
            <div
              className="arrow_left"
              onClick={() =>
                setCurrent(current == 0 ? length - 1 : current - 1)
              }
            >
              <ArrowCircleLeftIcon />
            </div>
            <div
              className="arrow_right"
              onClick={() =>
                setCurrent(current == length - 1 ? 0 : current + 1)
              }
            >
              <ArrowCircleRightIcon />
            </div>
            {blogs && blogs.length == 0 && <h6>No Blog Found</h6>}
            {blogs &&
              blogs.map((b, i) => (
                <div
                  className={
                    current == i
                      ? "avg_blog_wrappering active"
                      : "avg_blog_wrappering"
                  }
                  key={b._id}
                >
                  {current == i && (
                    <div className="avg_blog_wrapper">
                      <div className="avg_blog_top">
                        <div className="avg_blog_t_left">
                          <img
                            src={`http://localhost:8000/${b.photo}`}
                            className="avg_blog_t_left_img"
                          />
                        </div>
                        <div className="avg_blog_t_right">
                          <div className="avg_blog_t_right_box">
                            <div className="avg_blog_t_right_title">Title</div>
                            <div className="avg_blog_t_right_title_name">
                              {b.title}
                            </div>
                          </div>
                          <div className="avg_blog_t_right_box">
                            <div className="avg_blog_t_right_title">
                              Create Time
                            </div>
                            <div className="avg_blog_t_right_title_name">
                              {new Date(b.createdAt).toDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="avg_blog_bot">
                        <div className="avg_blog_b_left">
                          <div className="avg_blog_b_l_left">total reviews</div>
                          <div className="avg_blog_b_l_right">
                            {avgRating?.filter((a) => a._id == b._id)[0]
                              ? avgRating.filter((a) => a._id == b._id)[0]
                                  .totalReview
                              : 0}
                          </div>
                        </div>
                        <div className="avg_blog_b_right">
                          <div className="avg_blog_b_r_left">
                            average review
                          </div>
                          <div className="avg_blog_b_r_right">
                            {avgRating?.filter((a) => a._id == b._id)[0]
                              ? avgRating.filter((a) => a._id == b._id)[0]
                                  .avgReview
                              : 0}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
        <div className="lg:w-1/2 w-screen lg:h-full h-1/2 flex justify-center items-center">
          <form className="h-5/6 w-5/6 flex flex-col justify-evenly items-center">
            <h3 className="text-lg font-bold">Contact Me</h3>
            <input
              type="text"
              placeholder="enter your email"
              className="m-5 w-2/3 outline-none border-b-2 border-indigo-500"
            />
            <input
              type="password"
              placeholder="enter your decription"
              className="m-5 w-2/3 outline-none  border-b-2 border-indigo-500"
              name=""
              id=""
            />
            <h3 className="cursor-pointer p-2 bg-blue-600 rounded">send</h3>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MainBlog;
