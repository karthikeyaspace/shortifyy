import React from "react";

const Navbar: React.FC = () => {
  return (
    <div className="w-full h-[15vh]  flex items-center">
      <div className="w-[90%] md:w-[70%] h-full m-auto flex flex-row justify-between items-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl">Shortifyy</h1>
          <img src="img.png" className="w-[100px]" alt="" />
        </div>
        <a href="https://github.com/karthikeyaspace/shortifyy/" target="_blank">
          <img src="github.svg" className="w-10 h-10 text-black" alt="" />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
