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
// import { InfoIcon, bagPackIcon, gearIcon, saveIcon, shopIcon } from "../assets";
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
  } = useKeyboard();

  const [
    activeTexture,
    setTexture,
    shopMenu,
    setShopMenu,
    inventorybar,
    setInventoryBar,
  ] = useStore((state) => [
    state.blockTexture,
    state.setBlockTexture,
    state.shopMenu,
    state.setShopMenu,
    state.inventoryBar,
    state.setInventoryBar,
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
    };

    const pressedTexture = Object.entries(textures).find(([k, v]) => v);
    // console.log(pressedTexture);
    if (pressedTexture) {
      if (pressedTexture[0] == "buyMenu") {
        setShopMenu(!shopMenu);
        // setActiveConfig(activeConfig == "shopMenu" ? "e" : "shopMenu");
      } else if (pressedTexture[0] == "inventory") {
        setInventoryBar(!inventorybar);
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

      <div
        className="icon-container absolute flex left-2 gap-3 cursor-pointer bottom-2"
        style={{ margin: 0 }}
      ></div>
      {/* {loader && <Loader />} */}
    </div>
  );
};

export default TextureSelector;
