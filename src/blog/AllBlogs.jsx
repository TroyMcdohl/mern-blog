import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosCreate } from "../axiosHook/axiosCreate";
import "./allBlogs.css";

const AllBlogs = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosCreate.get("/blog/allblogs");
      setData(res);
    };

    fetchData();
  }, []);

  return (
    <div className="u_blog_container">
      <div className="u_blogs">
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

export default AllBlogs;
