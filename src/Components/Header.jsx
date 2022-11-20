import React from "react";
import AccountIcon from "./AccountIcon";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        LOGO
      </div>
      <div className="icons">
        {/* account icon for login signup */}
        <AccountIcon />
      </div>
    </div>
  );
};

export default Header;