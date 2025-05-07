import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import { ConnectWallet } from "./ConnectWallet";
import { useStore } from "../hooks/useStore";
import { updateWorldFunc } from "../utils/contractFunctionCall";
import { logoImg } from "../assets";

const Header = ({ isHome }) => {
  const [loader, setLoader] = useState(false);
  const [cubes, items, activeWorldID] = useStore((state) => [
    state.cubes,
    state.items,
    state.activeWorldID,
  ]);
  const params = useParams();
  const navigate = useNavigate();

  const saveGameData = async () => {
    const [cid, tokenId] = params.id.split("_");
    if (tokenId == "1") {
      navigate("/");
      return;
    }
    console.log("tokendID : " + tokenId);
    setLoader(true);
    const objData = {
      cubes,
      items,
    };
    // console.log("worldId: " + activeWorldID);
    console.log(objData);
    try {
      await updateWorldFunc(Number(tokenId), objData);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="absolute z-10 top-0 w-screen flex flex-col">
      <div className="w-full flex text-[2rem] justify-between items-center h-16 px-5 ">
        <div className="flex gap-4 items-center">
          <Link to="/" className="cursor-pointer">
            <div className="leading-7 m-0 p-0">
              <img src={logoImg} className="h-10  " />
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
            <button className="btn" onClick={() => saveGameData()}>
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
