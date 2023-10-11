import React, { useState } from "react";
import { useSelector } from "react-redux";

const useInput = (...para) => {
  const [change, setChange] = useState(false);
  const [val, setVal] = useState(para);
  const [chg, setChg] = useState(false);

  const inputBlurHandler = () => setChg(true);

  const inputChangeHandler = (e) => {
    setChange(true);
    setVal(e.target.value);
  };

  return { change, val, chg, inputBlurHandler, inputChangeHandler };
};

export default useInput;
