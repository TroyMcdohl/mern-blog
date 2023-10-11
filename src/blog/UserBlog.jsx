import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosCreate } from "../axiosHook/axiosCreate";
import "./userBlog.css";

const UserBlog = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosCreate.get(
        `/blog/${location.pathname.split("/")[2]}`
      );
      setData(res);
    };

    fetchData();
  }, []);

  let NoFoundBlog;

  if (location.pathname.split("/")[2] == "userblogs") {
    NoFoundBlog = () => {
      return (
        <h6
          style={{
            fontSize: "20px",
            height: "calc(100vh - 60px)",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          !Opps No Blogs Found.
          <Link to="/main/createblog" style={{ color: "blue" }}>
            Create a new one
          </Link>
        </h6>
      );
    };
  } else {
    NoFoundBlog = () => {
      return (
        <h6
          style={{
            fontSize: "20px",
            height: "calc(100vh - 60px)",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          !Opps No Blogs Found.
          <Link to="/main/otherblogs" style={{ color: "blue" }}>
            Like some blog
          </Link>
        </h6>
      );
    };
  }

  return (
    <div className="u_blog_container">
      <div className="u_blogs">
        {data && data.data.data.length == 0 && <NoFoundBlog />}
        {data &&
          data.data.data.map((d) => (
            <div
              className="u_blog"
              key={d._id}
              onClick={() => {
                navigate(`/main/blogs/${d._id}`, { state: { blog: d } });
              }}
            >
              <img
                src={`http://localhost:8000/${d.photo}`}
                alt=""
                className="u_blog_img"
              />
              <p className="u_blog_para">{d.content.slice(1, 300)}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserBlog;
