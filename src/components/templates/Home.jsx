import React from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "../pages/MainHeader";

const Home = () => {        
    return (
        <div>
          <MainHeader/>
          <Outlet/>
        </div>
    );
  }
  
  export default Home;