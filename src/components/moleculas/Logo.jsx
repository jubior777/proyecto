import React from 'react';
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="logo flex">
      <Link to="/">
       <img
          src="https://res.cloudinary.com/dqj8v0x2g/image/upload/v1698230984/Logo"
          alt="Logo artesania blanco"
        />
      </Link>
    </div> 
  )
}
  
export default Logo;

