import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ControlMenu, Header, Loader } from "../components";
import { bgImg, landImg, landsImg, logoImg, settingImg } from "../assets";
import { RxCross2 } from "react-icons/rx";
import {
  createWorldFunc,
  getOwnerNftsFunc,
  transferWorldFunc,
} from "../utils/contractFunctionCall";
import { useStore } from "../hooks/useStore";
import { extractCID } from "../helpers/convertor";
import { isAddress } from "viem";

export default function Home() {
  const [loader, setLoader] = useState(false);
  const [controlMenu, setControlMenu] = useState(false);
  const [loadGame, setLoadGame] = useState(false);
  const [tranferWorldMenu, setTranferWorldMenu] = useState(false);
  const [tranferWorldTokenID, setTranferWorldTokenID] = useState(0);
  const [newWorldMenu, setNewWorldMenu] = useState(false);
  const [receiptAddress, setReceiptAddress] = useState("");
  const [worldName, setWorldName] = useState("");
  const [worldList, setWorldList] = useState([]);
  const [worldDescription, setWorldDescription] = useState("");
  const navigate = useNavigate();
  // const [setActiveWorldID] = useStore((state) => [state.setActiveWorldID]);

  const createWorld = async () => {
    if (worldName && worldDescription) {
      try {
        setLoader(true);
        const data = await createWorldFunc(worldName, worldDescription);

        setLoader(false);
        setNewWorldMenu(false);
        navigate(`/world/${data.CID}_${data.nextToken}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchWorld = async () => {
      try {
        setLoader(true);
        setWorldList(await getOwnerNftsFunc());
        setLoader(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWorld();
  }, []);

  const handleSubmitTransfer = async (e) => {
    e.preventDefault();
    if (!isAddress(receiptAddress)) return;
    try {
      setLoader(true);
      console.log(receiptAddress, tranferWorldTokenID);
      await transferWorldFunc(receiptAddress, tranferWorldTokenID);
      setTranferWorldTokenID(() => 0);
      setReceiptAddress("");
      setTranferWorldMenu(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="homepage">
      {newWorldMenu && (
        <div className="control setting menu absolute h-screen w-screen make-flex ">
          <div className=" bg-[#8f2d0fd0] rounded-[30px]">
            <div
              className="absolute w-[500px] -translate-x-1 translate-y-1   make-flex justify-end px-2 pt-2 cursor-pointer"
              onClick={() => setNewWorldMenu(false)}
            >
              <span>
                <RxCross2 />
              </span>
            </div>
            <div className="z-100 gameloader-container w-[500px] min-h-[200px]  py-7 card-container make-flex justify-start flex-col gap-3 px-7">
              <div className="w-full">
                <label className="">Name of World</label>
                <input
                  type="text"
                  value={worldName}
                  onChange={(e) => setWorldName(e.target.value)}
                  className="border-2 mt-1 border-black w-full px-1 text-xl text-black h-10 rounded-md font-vt"
                />
              </div>
              <div className="w-full">
                <label>Description</label>
                <textarea
                  value={worldDescription}
                  onChange={(e) => setWorldDescription(e.target.value)}
                  className="border-2 mt-1 border-black w-full px-1 text-xl text-black h-20 rounded-md font-vt"
                />
              </div>
              <button
                className="btn py-3 px-6 text-md  hover:scale-[102%]"
                onClick={() => createWorld()}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
      {loadGame && (
        <div className="control setting menu absolute h-screen w-screen make-flex">
          <div>
            <div
              className="absolute w-[490px]  make-flex text-black justify-end px-2 pt-2 cursor-pointer"
              onClick={() => setLoadGame(false)}
            >
              <span>
                <RxCross2 />
              </span>
            </div>
            <ul className=" z-100 gameloader-container w-[500px] text-black bg-[#dce4b7] min-h-[300px] py-12 card-container make-flex justify-start flex-col gap-3 px-7">
              {worldList && worldList.length ? (
                worldList.map(({ name, tokenId, uri }) => {
                  const tokenID = Number(tokenId);
                  if (
                    !name ||
                    uri.startsWith("https://gateway.lighthouse.storage/ipfs/")
                  )
                    return;
                  return (
                    <li
                      className=" text-center w-full py-1  cursor-pointer hover:bg-[#d0d85c]"
                      key={tokenID}
                      onClick={() => {
                        setLoadGame(false);
                        navigate(`/world/${uri}_${tokenID}`);
                      }}
                    >
                      {name}
                    </li>
                  );
                })
              ) : (
                <li className=" text-center w-full py-1 bg-[#ececec] cursor-pointer hover:bg-[#e8e8e8]">
                  No world Created Yet
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
      {tranferWorldMenu && (
        <div className="control setting menu absolute h-screen w-screen make-flex">
          <div className="relative  w-[490px]">
            <span
              className="absolute top-2 right-1 text-black cursor-pointer"
              onClick={() => setTranferWorldMenu(false)}
            >
              <RxCross2 />
            </span>

            <form
              onSubmit={handleSubmitTransfer}
              className="z-100 text-lg gameloader-container w-full min-h-[200px]  py-7 card-container make-flex justify-start flex-col gap-3 px-7"
            >
              <div className="w-full">
                <label className="">Address</label>
                <input
                  type="text"
                  value={receiptAddress}
                  required
                  onChange={(e) => setReceiptAddress(e.target.value)}
                  className="border-2 mt-1  border-black w-full px-1 text-md text-black rounded-md font-vt"
                />
              </div>
              <select
                required
                value={tranferWorldTokenID}
                onChange={(e) => setTranferWorldTokenID(() => e.target.value)}
                className="w-full border-black p-1.5 mt-1 bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block "
              >
                <option value="" defaultValue>
                  Select a world
                </option>
                {worldList && worldList.length ? (
                  worldList.map(({ name, tokenId, uri }) => {
                    const tokenID = Number(tokenId);

                    if (
                      !name ||
                      uri.startsWith("https://gateway.lighthouse.storage/ipfs/")
                    )
                      return;
                    return (
                      <option key={tokenID} value={tokenID}>
                        {name}
                      </option>
                    );
                  })
                ) : (
                  <div className="text-center w-full">No lands created</div>
                )}
              </select>
              <button
                type="submit"
                className="btn py-2 px-4 text-md hover:scale-[102%]"
              >
                Transfer
              </button>
            </form>
          </div>
        </div>
      )}
      {controlMenu && <ControlMenu setControlMenu={setControlMenu} />}
      <img src={bgImg} className="absolute -z-10 h-screen w-screen" />
      <Header isHome={true} />
      <div className="make-flex justify-start pt-32 w-screen h-screen flex-col gap-8">
        <img src={logoImg} className="h-20" />
        <div className="w-screen mx-auto h-[300px] make-flex gap-14">
          <div
            onClick={() => setNewWorldMenu(true)}
            className="make-flex flex-col card-container gap-2 w-[280px] h-[280px] text-base cursor-pointer"
          >
            <div className="img-container w-[200px] h-[200px] make-flex">
              <img src={landImg} className="h-[150px]" />
            </div>
            <h2 className="text-lg">Create World</h2>
          </div>
          <div
            onClick={() => setLoadGame(true)}
            className="make-flex flex-col card-container gap-2 w-[280px] h-[280px] text-base cursor-pointer"
          >
            <div className="img-container w-[200px] h-[200px] make-flex">
              <img src={landsImg} className="" />
            </div>
            <h2 className="text-lg">Load World</h2>
          </div>
          <div
            onClick={() => setTranferWorldMenu(true)}
            className="make-flex flex-col card-container gap-2 w-[280px] h-[280px] text-base cursor-pointer"
          >
            <div className="img-container w-[200px] h-[200px] make-flex">
              <img src={settingImg} className="h-[160px]" />
            </div>
            <h2 className="text-lg">Transfer World</h2>
          </div>
          <div
            onClick={() => setControlMenu(true)}
            className="make-flex flex-col card-container gap-2 w-[280px] h-[280px] text-base cursor-pointer"
          >
            <div className="img-container w-[200px] h-[200px] make-flex">
              <img src={settingImg} className="h-[160px]" />
            </div>
            <h2 className="text-lg">Game Settings</h2>
          </div>
        </div>
      </div>
      {loader && <Loader />}
    </div>
  );
}
