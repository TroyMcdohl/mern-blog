import React, { useState } from "react";

const useDisplayError = () => {
  const [err, setErr] = useState(false);
  const [errData, setErrData] = useState(null);

  props.setErr = setErr;
  props.setErrData = setErrData;

  return <h5>{errData}</h5>;
};

export default useDisplayError;
