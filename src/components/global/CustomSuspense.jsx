import React from "react";
import LinearProg from "./LinearProg";

function CustomSuspense({ children }) {
  return (
    <React.Suspense fallback={<LinearProg loading={true} />}>
      {children}
    </React.Suspense>
  );
}

export default CustomSuspense;
