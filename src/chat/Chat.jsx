import { useEffect, useState } from "react";
import { axiosCreate } from "../axiosHook/axiosCreate";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import "./chat.css";

const Chart = () => {
  const [dataa, setDataa] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosCreate.get("/blog/blogposts");
      setDataa(res);
    };
    fetchData();
  }, []);

  const days = {
    1: "1-Sun",
    2: "2-Mon",
    3: "3-Tue",
    4: "4-Wed",
    5: "5-Thur",
    6: "6-Fri",
    7: "7-Sat",
  };

  const dataFetching = () => {
    const arrObj = [];

    Object.keys(days).forEach((el, i) => {
      const newObj = {};
      if (dataa?.data.data.find((f) => f._id == el)) {
        newObj["name"] = days[el];
        newObj["posts"] = dataa.data.data.filter((d) => d._id == el)[0].posts;
      } else {
        newObj["name"] = days[el];
        newObj["posts"] = 0;
      }
      arrObj.push(newObj);
    });

    return arrObj;
  };

  // const data = [
  //   { name: "Mon", posts: 100, pv: 2400, amt: 2400 },
  //   { name: "Tue", posts: 90 },
  //   { name: "Wed", posts: 60 },
  //   { name: "Thur", posts: 50 },
  //   { name: "Fri", posts: 40 },
  //   { name: "Sat", posts: 30 },
  //   { name: "Sun", posts: 20 },
  // ];

  const data = dataFetching();

  return (
    <LineChart width={380} height={150} data={data}>
      <Line type="monotone" dataKey="posts" stroke="blue" />
      <CartesianGrid stroke="gray" />
      <XAxis
        dataKey="name"
        style={{
          fontSize: "0.8rem",
          fontFamily: "Times New Roman",
        }}
      />
      <YAxis
        style={{
          fontSize: "0.8rem",
          fontFamily: "Times New Roman",
        }}
      />
      <Tooltip />
    </LineChart>
  );
};

export default Chart;
