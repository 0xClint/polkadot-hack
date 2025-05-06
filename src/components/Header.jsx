import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { ConnectWallet } from "./ConnectWallet";

const Header = ({ isHome }) => {
  const [loader, setLoader] = useState(false);
  return (
    <div className="absolute z-10 top-0 w-screen flex flex-col">
      <div className="w-full flex text-[2rem] justify-between items-center h-16 px-5 ">
        <div className="flex gap-4 items-center">
          <Link to="/" className="cursor-pointer">
            <div className="leading-7 m-0 p-0">
              <img src={"#"} className="h-8  " />
            </div>
          </Link>
        </div>

        <div className="flex items-center justify-center gap-3">
          {!isHome ? (
            <div
              // onClick={() => setInfoBar(!infoBar)}
              className="icon-container mr-2"
              style={{ transform: "translateX(15px)" }}
            >
              <span className="absolute text-[6px] m-1 translate-x-[7px] translate-y-[3px] text-white">
                P
              </span>
              {/* <img
                src={profileIcon}

                className={`${"infoMenu" === activeConfig ? "active" : ""}`}
              /> */}
            </div>
          ) : (
            <ConnectWallet />
          )}
          {!isHome && (
            <button
              className="btn"
              // onClick={() => saveGameData()}
            >
              Save
            </button>
          )}
        </div>
      </div>
      {loader && <Loader />}
    </div>
  );
};

export default Header;
