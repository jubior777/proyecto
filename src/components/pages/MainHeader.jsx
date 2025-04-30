import React from "react";
import Logo from "../moleculas/Logo";
import MainMenu from "../moleculas/MainMenu";


const MainHeader = () => {
  return (
    <div className="fixed bg-gradient w-full z-10">
      <div className="w-full m-auto flex items-center lg:max-w-256">
        <Logo/>
        <MainMenu/>
      </div>
    </div>
  );
};

export default MainHeader;
