import "./Game.css";
import { Physics } from "@react-three/cannon";
import { PointerLockControls, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import {
  Clouds,
  Cubes,
  Ground,
  Items,
  Player,
  TextureSelector,
} from "../game-components";
import { Header, Inventory, Shop } from "../components";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStore } from "../hooks/useStore";

const Stars = () => {
  return (
    <group>
      {Array.from({ length: 100 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.random() * 1000 - 500,
            Math.random() * 1000 - 500,
            Math.random() * 1000 - 500,
          ]}
        >
          <sphereGeometry args={[Math.random() * 2]} />
          <meshBasicMaterial color={0xffffff} />
        </mesh>
      ))}
    </group>
  );
};

export default function Game() {
  const [loader, setLoader] = useState(false);
  const [] = useState(false);
  // const [data, setData] = useState([]);
  const params = useParams();
  const [setData, shopMenu, setShopMenu, inventoryBar] = useStore((state) => [
    state.setData,
    state.shopMenu,
    state.setShopMenu,
    state.inventoryBar,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const [cid, tokenId] = params.id.split("_");
      const res = await axios.get(
        `https://gateway.lighthouse.storage/ipfs/${cid}/`
      );

      console.log(res.data);
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="game-app">
      <Canvas style={{ height: "100vh" }}>
        <Sky sunPosition={[100, 40, 20]} turbidity={4} />
        <PointerLockControls selector="#enter-game" />
        <ambientLight intensity={0.6} />
        <Physics>
          <Clouds />
          <Ground />
          <Player />
          <Cubes />
          <Items />
        </Physics>
        <Stars />
      </Canvas>
      <TextureSelector />
      <div
        className="absolute centered cursor enter-game"
        style={{ zIndex: 1, cursor: "pointer" }}
        id="enter-game"
      >
        <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
          <path
            d="M9.54849 23V0H13.4515V23H9.54849ZM0 13.4515V9.54849H23V13.4515H0Z"
            fill="white"
          />
        </svg>
      </div>
      {shopMenu && <Shop />}
      {inventoryBar && <Inventory />}
      <Header />
    </div>
  );
}
