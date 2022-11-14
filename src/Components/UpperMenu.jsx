import React from "react";
import { useTestMode } from "../Context/TestMode";

const UpperMenu = ({ countDown }) => {
  const { setTestTime } = useTestMode();
  
  const updateTime = (e) => {
    setTestTime(e.target.id);
    // test time will be updated in context testtime state by this
  };

  return (
    <div className="upper-menu">
      <div className="counter">{countDown}</div>
      <div className="time-modes">
        <div className="time" id="15" onClick={(e) => updateTime(e)}>
          15s
        </div>
        <div className="time" id="30" onClick={(e) => updateTime(e)}>
          30s
        </div>
        <div className="time" id="60" onClick={(e) => updateTime(e)}>
          60s
        </div>
        {/* can also pass 15, 30 and 60 in update time function call, () => updateTime(15), () => updateTime(30), etc. */}
      </div>
    </div>
  );
};

export default UpperMenu;
