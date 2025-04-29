import React from 'react';
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex">
      <Link to="/">
       <img
          src="img/logo.png" alt="Artesania"
        />
      </Link>
    </div> 
  )
}
  
export default Logo;


