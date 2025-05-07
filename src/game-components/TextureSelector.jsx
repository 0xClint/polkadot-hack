import React, { useEffect, useState } from "react";
import { useStore } from "../hooks/useStore";
import { useKeyboard } from "../hooks/useKeyboard";
import {
  diamondImg,
  grassImg,
  glassImg,
  woodImg,
  quartzImg,
  stoneImg,
  treeImg,
} from "../assets/block-icons/images";
import { FiShoppingBag } from "react-icons/fi";
import { MdOutlineInventory2 } from "react-icons/md";
import { PiGameController } from "react-icons/pi";
import Loader from "../components/Loader";

const images = {
  grass: grassImg,
  tree: treeImg,
  glass: glassImg,
  wood: woodImg,
  diamond: diamondImg,
  quartz: quartzImg,
  stone: stoneImg,
};

const TextureSelector = () => {
  const {
    grass,
    tree,
    glass,
    wood,
    diamond,
    quartz,
    stone,
    chatMenu,
    inventory,
    settings,
    buyMenu,
    infoMenu,
    saveBtn,
    profileMenu,
    controlMenu,
  } = useKeyboard();

  const [
    activeTexture,
    setTexture,
    shopMenu,
    setShopMenu,
    inventorybar,
    setInventoryBar,
    controlBar,
    setControlBar,
  ] = useStore((state) => [
    state.blockTexture,
    state.setBlockTexture,
    state.shopMenu,
    state.setShopMenu,
    state.inventoryBar,
    state.setInventoryBar,
    state.controlBar,
    state.setControlBar,
  ]);

  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const textures = {
      grass,
      tree,
      glass,
      wood,
      diamond,
      quartz,
      stone,
      chatMenu,
      inventory,
      settings,
      buyMenu,
      infoMenu,
      saveBtn,
      profileMenu,
      controlMenu,
    };

    const pressedTexture = Object.entries(textures).find(([k, v]) => v);
    // console.log(pressedTexture);
    if (pressedTexture) {
      if (pressedTexture[0] == "buyMenu") {
        setShopMenu(!shopMenu);
        // setActiveConfig(activeConfig == "shopMenu" ? "e" : "shopMenu");
      } else if (pressedTexture[0] == "inventory") {
        setInventoryBar(!inventorybar);
      } else if (pressedTexture[0] == "controlMenu") {
        setControlBar(!controlBar);
      } else {
        setTexture(pressedTexture[0]);
      }
    }
  }, [
    setTexture,
    grass,
    tree,
    glass,
    wood,
    diamond,
    quartz,
    stone,
    buyMenu,
    inventory,
    controlMenu,
  ]);

  return (
    <div>
      <div className="texture-selector icon-container">
        {Object.entries(images).map(([k, src], index) => {
          return (
            <div key={k}>
              <span className="absolute text-[10px] m-1 translate-x-[3px] translate-y-[3px] text-[#0e0d0d] font-semibold">
                {index + 1}
              </span>
              <img
                key={k}
                src={src}
                style={{ scale: "1" }}
                className={`${k === activeTexture ? "active" : ""}`}
              />
            </div>
          );
        })}
      </div>
      <div className="icon-container absolute right-0 top-[30%] z-10 cursor-pointer">
        {/* <div onClick={() => setSettingMenu(!settingMenu)}>
          <span className="absolute text-[9px] m-1 translate-x-[7px] translate-y-[3px] text-[#7b260c] font-semibold">
            E
          </span>
          <img
            src={gearIcon}
            className={`${"setting" === activeConfig ? "active" : ""}`}
          />
        </div> */}
        <div
          onClick={() => setShopMenu(!shopMenu)}
          className="btn-items relative flex-center"
        >
          <span className="absolute top-1 left-1 text-[9px] text-[#0e0d0d] font-semibold">
            B
          </span>
          <FiShoppingBag className="text-2xl" />
        </div>
        <div
          onClick={() => setInventoryBar(!inventorybar)}
          className="btn-items relative flex-center"
        >
          <span className="absolute top-1 left-1 text-[9px] text-[#0e0d0d] font-semibold">
            Q
          </span>
          <MdOutlineInventory2 className="text-2xl" />
        </div>
        <div
          onClick={() => setInventoryBar(!inventorybar)}
          className="btn-items relative flex-center"
        >
          <span className="absolute top-1 left-1 text-[9px] text-[#0e0d0d] font-semibold">
            C
          </span>
          <PiGameController className="text-2xl" />
        </div>
        {/* <div onClick={() => setInfoBar(!infoBar)}>
          <span className="absolute text-[9px] m-1 translate-x-[7px] translate-y-[3px] text-[#7b260c]">
            I
          </span>
          <img
            src={InfoIcon}
            className={`${"infoMenu" === activeConfig ? "active" : ""}`}
          />
          {infoBar && (
            <ul className="btn absolute  -translate-x-[250px] -translate-y-[75px] w-[250px] text-[18px] py-2 px-3 font-vt">
              <li>To exist view press ESC</li>
              <li> Click on the center pointer to continue</li>
            </ul>
          )}
        </div> */}
      </div>
      <div
        className="icon-container absolute flex left-2 gap-3 cursor-pointer bottom-2"
        style={{ margin: 0 }}
      ></div>
      {/* {loader && <Loader />} */}
    </div>
  );
};

export default TextureSelector;
