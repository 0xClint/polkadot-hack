import React from "react";
import { RxCross2 } from "react-icons/rx";

export default function ControlMenu({ setControlMenu = () => {} }) {
  return (
    <div className="control setting menu absolute h-screen w-screen make-flex ">
      <div className=" bg-[#8f2d0fd0] rounded-[30px]">
        <div
          className="absolute w-[440px]  make-flex justify-end px-2 pt-2 cursor-pointer"
          onClick={() => setControlMenu(false)}
        >
          <span className="font-bold">
            <RxCross2 />
          </span>
        </div>
        <ul className=" z-100 menu-container w-[450px]  py-12 card-container make-flex flex-col gap-3 ">
          <li className=" flex justify-between w-[80%] ">
            <div className="">W</div>
            <div className="">Forward</div>
          </li>
          <li className=" flex justify-between w-[80%]">
            <div className="">A</div>
            <div className="">Leftward</div>
          </li>
          <li className=" flex justify-between w-[80%]">
            <div className="">D</div>
            <div className="">Backward</div>
          </li>
          <li className=" flex justify-between w-[80%]">
            <div className="">S</div>
            <div className="">Forward</div>
          </li>
          <li className=" flex justify-between w-[80%]">
            <div className="">C</div>
            <div className="">Chatbox</div>
          </li>
          <li className=" flex justify-between w-[80%]">
            <div className="">Q</div>
            <div className="">Inventory</div>
          </li>
          <li className=" flex justify-between w-[80%]">
            <div className="">E</div>
            <div className="">Setting</div>
          </li>
          <li className=" flex justify-between w-[80%]">
            <div className="">B</div>
            <div className="">Buy</div>
          </li>
          <li className=" flex justify-between w-[80%]">
            <div className="">Space</div>
            <div className="">Jump</div>
          </li>
          <li className=" flex justify-between w-[80%]">
            <div className="">Click</div>
            <div className="">Build</div>
          </li>
          <li className=" flex justify-between w-[80%]">
            <div className="">Alt+Click</div>
            <div className="">Destroy</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
