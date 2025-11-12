import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8 relative">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={"/logo.svg"}
            alt="King of Sedari"
            className="w-28 md:w-32 object-contain animate-fade-in"
          />
        </Link>

        {/* Copyright */}
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 animate-pulse text-center">
          © 2025 King of Sedari. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-6">
          {[
            {
              icon: <FaFacebook />,
              link: "https://www.facebook.com/profile.php?id=100064067344055",
              color: "fill-blue-600",
            },
            {
              icon: <FaInstagram />,
              link: "https://www.instagram.com",
              color: "fill-pink-500",
            },
            {
              icon: <IoLogoTiktok />,
              link: "https://www.tiktok.com",
              color: "fill-black",
            },
          ].map((social, index) => (
            <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-2xl ${social.color} hover:scale-125 transition-transform duration-500 animate-bounce-slow`}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Optional Animated Gradient Bar */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-pink-500 to-purple-600 animate-marquee"></div>
    </footer>
  );
}

export default Footer;
