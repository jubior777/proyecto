import React from 'react';
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="logo flex">
      <Link to="/">
       <img
          src="/trabajo.jpg" class="h-11" 
          alt="Tailwind Play"
        />
      </Link>
    </div> 
  )
}
  
export default Logo;


