import React from "react";
import Root from "./src/root";

export const wrapRootElement = ({ element }) => {
  return <Root>{element}</Root>;
};
