import React from "react";
import Root from "./src/root";

import "./src/global.css";

export const wrapRootElement = ({ element }) => {
  return <Root>{element}</Root>;
};
