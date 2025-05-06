import "./Game.css";
import { Physics } from "@react-three/cannon";
import { PointerLockControls, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import {
  Clouds,
  Cubes,
  Ground,
  Player,
  TextureSelector,
} from "../game-components";
import { Header } from "../components";

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
      <Header />
    </div>
  );
}
