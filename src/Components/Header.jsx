import React from "react";
import AccountIcon from "./AccountIcon";
import CompareButton from "./CompareButton";

const Header = () => {
  return (
    <div className="header">
      <div className="logo" style={{display: "flex"}} >
        <span style={{display: "block", marginRight: "10px"}} >Typing Test</span>
        <CompareButton />
      </div>
      <div className="icons">
        {/* account icon for login signup */}
        <AccountIcon />
      </div>
    </div>
  );
};

export default Header;
