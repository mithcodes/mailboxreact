import React from "react";
import { useSelector } from "react-redux";
import ComposeMail from "./ComposeMail";

function Welcome() {
  const token = useSelector((state) => state.auth.token);

  return (
    <div>
      <ComposeMail />
    </div>
  );
}

export default Welcome;
