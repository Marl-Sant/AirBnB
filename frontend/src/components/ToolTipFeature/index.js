import React from "react";
import "./ToolTip.css";
export default function Tooltip({children, spotName, }) {
  const [show, setShow] = React.useState(false);
  return (
    <div>
      <div className="tooltip" style={show ? { visibility: "visible" } : {}}>
        {spotName}
        <span className="tooltip-arrow" />
      </div>
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
          {children}
      </div>
    </div>
  );
}
