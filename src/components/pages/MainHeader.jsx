import React from "react";
import MainMenu from "../moleculas/MainMenu";
import Logo from "../moleculas/Logo";

const MainHeader = () => {
  return (
    <div className="fixed bg-gradient w-full z-10">
      <div className="w-full m-auto flex items-center lg:max-w-200">
        <Logo/>
        <MainMenu/>
      </div>
    </div>
  );
};

export default MainHeader;
