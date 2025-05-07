import { nanoid } from "nanoid";
import create from "zustand";
// import { imgData } from "../images/Items";

export const useStore = create((set) => ({
  blockTexture: "grass",
  setBlockTexture: (blockTexture) => {
    set(() => ({ blockTexture }));
  },
  cubes: [],
  getLevel: 0,
  setLevel: (toggle) => {
    set(() => ({ getLevel: toggle }));
  },
  setData: (data) => {
    if (data) {
      set(() => ({
        cubes: [...data.cubes],
        items: [...data.items],
      }));
    }
  },
  addCube: (x, y, z) => {
    set((prev) => ({
      cubes: [
        ...prev.cubes,
        {
          key: nanoid(),
          pos: [x, y, z],
          texture: prev.blockTexture,
        },
      ],
    }));
  },
  removeCube: (x, y, z) => {
    set((prev) => ({
      cubes: prev.cubes.filter((cube) => {
        const [X, Y, Z] = cube.pos;
        return X !== x || Y !== y || Z !== z;
      }),
    }));
  },
  items: [],
  addItem: (x, y, z) => {
    set((prev) => ({
      items: [
        ...prev.items,
        { key: nanoid(), pos: [x, y, z], texture: prev.blockTexture },
      ],
    }));
  },
  removeItem: (x, y, z) => {
    set((prev) => ({
      items: prev.items.filter((item) => {
        const [X, Y, Z] = item.pos;
        return X !== x || Y !== y || Z !== z;
      }),
    }));
  },
  activeWorldID: 0,
  setActiveWorldID: (toggle) => {
    set(() => ({ activeWorldID: toggle }));
  },
}));
