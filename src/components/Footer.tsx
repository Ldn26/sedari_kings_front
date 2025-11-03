import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaInstagram } from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";


function Footer() {
  return (
    <div className="flex items-center p-4  flex-col   gap-4 justify-center">
      <h1>© 2025 King of sedari All rights reserved.</h1>
      <div className="flex items-center gap-8 justify-around">
        <Link to="https://www.facebook.com/profile.php?id=100064067344055"
         target='_blank'
         >
          <FaFacebook

            size={30}
            className="fill-blue-500 hover:scale-110 transition-all"
          />
        </Link>
        <Link to="https://facebook.com">
          <FaInstagram
            size={30}
            className="fill-pink-400 hover:scale-110 transition-all"
          />
        </Link>
        <Link to="facebook.com">
          <IoLogoTiktok
            size={30}
            className="fill-black  hover:scale-110 transition-all"
          />
        </Link>
      </div>
    </div>
  );
}

export default Footer