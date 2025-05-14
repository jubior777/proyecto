import React from "react";
import PropTypes from "prop-types";
import Logo from "../moleculas/Logo";

const MainHeader = ({ children }) => {
  return (
    <div className="fixed bg-gradient w-full z-10">
      <div className="w-full m-auto flex items-center lg:max-w-256">
        <Logo />
        {children}
      </div>
    </div>
  );
};

MainHeader.propTypes = {
  children: PropTypes.node,
};

export default MainHeader;
