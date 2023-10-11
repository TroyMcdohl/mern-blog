import React from "react";
import { RadialBarChart, RadialBar } from "recharts";

const Circlechart = () => {
  // Sample data
  const data = [
    { name: "A", x: 1, fill: "green" },
    { name: "B", x: 2, fill: "yellow" },
    { name: "C", x: 3, fill: "aqua" },
    { name: "D", x: 4, fill: "blue" },
    { name: "E", x: 5, fill: "orange" },
    { name: "F", x: 6, fill: "red" },
    { name: "G", x: 7, fill: "gray" },
  ];

  return (
    <RadialBarChart width={200} height={200} data={data}>
      <RadialBar minAngle={15} dataKey="x" />
    </RadialBarChart>
  );
};

export default Circlechart;
