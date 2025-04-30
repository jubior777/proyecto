import React from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "../pages/MainHeader";

const Home = () => {        
    return (
      <div >
        <MainHeader/>
        <div className="pt-16 max-w-256 m-auto">
          <Outlet/>
        </div>
      </div>
    );
  }
  
  export default Home;