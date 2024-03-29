"use client";

import { useEffect, useState } from "react";
import { COLORS, DOMAIN, PlacementSeconds } from "../_utils/constants";
import ColorBox from "../_components/colorBox";
import { Login } from "./login";

export const Game = ({ isLoggedIn: hasLoggedIn, isAdmin }) => {
  const [game, setGame] = useState();
  const [hoveredColor, setHoveredColor] = useState(null);
  const [isColorUIOpened, setIsColorUIOpened] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(hasLoggedIn);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    let UIHeight = 0;
    if (!document.querySelector("#ui").classList.contains("hidden")) {
      UIHeight = document.querySelector("#ui").clientHeight;
    }

    document.querySelector("#loading").style.top = `calc(50% - ${
      UIHeight / 2
    }px)`;
    document.querySelector("#loading").classList.remove("hidden");

    async function initPhaser() {
      const Phaser = await import("phaser");
      const { default: MainScene } = await import("../_scenes/main");
      const PhaserGame = new Phaser.Game({
        type: Phaser.AUTO,
        parent: "app",
        width: window.innerWidth,
        height: window.innerHeight, //window.innerHeight - UIHeight
        scale: {
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        transparent: true,
        pixelArt: false,
        scene: [MainScene],
        physics: {
          default: "arcade",
          arcade: { gravity: { y: 200 } },
        },
      });
      setGame(PhaserGame);
    }
    initPhaser();
  }, []);

  return (
    <>
      <div id="app"></div>
      <div
        className="flex justify-center absolute top-4 left-1/2 -translate-x-1/2 min-w-[12rem] py-0.5 bg-white font-mono rounded-full select-none container-shadow z-10"
        id="coordinates"
      >
        Yükleniyor...
      </div>
      {!isLoggedIn && !isAdmin && <Login />}
      {(isLoggedIn || isAdmin) && (
        <div
          className="flex justify-center items-center absolute top-4 left-4 w-8 h-8 bg-white hover:bg-slate-200 transition-colors duration-500 rounded-full select-none cursor-pointer container-shadow z-10"
          id="volume"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z" />
          </svg>
        </div>
      )}
      {isLoggedIn && !isAdmin && (
        <div
          className="flex justify-center items-center absolute top-4 right-4 w-8 h-8 bg-white hover:bg-slate-200 transition-colors duration-500 rounded-full select-none cursor-pointer container-shadow z-10"
          onClick={() => {
            setIsLoggingOut(true);
            fetch(`${DOMAIN}/api/users/logout`, {
              method: "GET",
              credentials: "include",
            })
              .then((_) => {
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              })
              .catch((error) => {
                setTimeout(() => {
                  setIsLoggingOut(false);
                }, 1000);
              });
          }}
        >
          {isLoggingOut && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
              className="animate-spin"
            >
              <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z" />
            </svg>
          )}
          {!isLoggingOut && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
            </svg>
          )}
        </div>
      )}
      {isAdmin && (
        <div
          className="flex justify-center items-center absolute top-4 right-4 w-8 h-8 bg-white hover:bg-slate-200 transition-colors duration-500 rounded-full select-none cursor-pointer container-shadow z-10"
          id="fillColor"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="20"
          >
            <path d="M320-640v320-320Zm-80 400v-480h480v480H240Zm80-80h320v-320H320v320Z" />
          </svg>
        </div>
      )}
      <div
        className="justify-center absolute top-14 left-1/2 -translate-x-1/2 min-w-[12rem] px-2 py-0.5 bg-white text-center font-mono rounded-full select-none container-shadow animate-pulse z-10 hidden"
        id="connectionError"
      >
        Bağlantı koptu, yeniden bağlanılıyor...
      </div>
      <div
        className="justify-center items-center bg-zinc-800 w-20 py-1 absolute top-0 left-0 border-2 border-zinc-900 z-10 hidden"
        id="fpsCounterContainer"
      >
        <span className="text-neutral-200 select-none">
          <span id="fpsCounter"></span> FPS
        </span>
      </div>
      <div
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 hidden"
        id="loading"
      >
        <img src="/images/loading.gif" />
      </div>
      <div
        className={`flex flex-col justify-center gap-3 absolute bottom-0 w-full bg-slate-50 py-2 ${
          isLoggedIn || isAdmin ? "" : "hidden"
        } ${!isColorUIOpened ? "translate-y-full" : ""} duration-1000`}
        id="ui"
      >
        <div
          className="hidden absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/10 to-black/40"
          id="backdrop"
        ></div>
        <div
          className={`flex justify-center items-center absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-20 h-8 ${
            isColorUIOpened ? "bg-slate-50/40" : "bg-slate-50"
          } rounded-t-md cursor-pointer transition-colors duration-1000`}
          onClick={() => {
            const UIHeight = document.querySelector("#ui").clientHeight;
            setIsColorUIOpened((prevIsColorUIOpened) => !prevIsColorUIOpened);
          }}
        >
          {isColorUIOpened ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className="w-8"
            >
              <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className="w-8"
            >
              <path d="m296-345-56-56 240-240 240 240-56 56-184-184-184 184Z" />
            </svg>
          )}
        </div>
        <div
          className="flex flex-wrap justify-center gap-0.5 px-0.5"
          id="colorContainer"
        >
          {COLORS.map((color, index) => (
            <ColorBox
              index={index}
              color={color}
              hoveredColor={hoveredColor}
              setHoveredColor={setHoveredColor}
              key={index}
            />
          ))}
        </div>
        <div
          className="hidden justify-center items-center gap-4"
          id="confirmContainer"
        >
          <div
            className="px-7 py-1.5 border-2 border-gray-200 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            id="cancelPlacement"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </div>
          <div
            className="px-7 py-1.5 border-2 border-gray-200 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            id="confirmPlacement"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          </div>
        </div>
        <div
          className="hidden justify-center items-center gap-2 px-8"
          id="breakContainer"
        >
          <div
            className="flex gap-2 items-center px-7 py-1.5 border-2 border-gray-200 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors cursor-pointer timer-shadow z-10"
            id="confirmPlacement"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
            </svg>
            <span className="font-semibold select-none">
              00:00:
              <span id="secondsLeft">{("0" + PlacementSeconds).slice(-2)}</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
