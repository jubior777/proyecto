import React from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "../pages/MainHeader";
import AdminMenu from "../moleculas/AdminMenu";

const Admin = () => {        
    return (
      <div >
        <MainHeader>
            <AdminMenu/>
        </MainHeader>
        <div className="pt-16 max-w-256 m-auto">
          <Outlet/>
        </div>
      </div>
    );
  }
  
  export default Admin;