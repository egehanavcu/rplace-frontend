"use client";

import { useEffect, useState } from "react";
import { COLORS, PlacementSeconds } from "../_utils/constants";
import ColorBox from "../_components/colorBox";
import { AdminPanel } from "../_components/adminPanel";
import { Login } from "./login";

export const Game = ({ isAdmin }) => {
  const [game, setGame] = useState();
  const [hoveredColor, setHoveredColor] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

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
        height: window.innerHeight - UIHeight,
        scale: {
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        transparent: true,
        pixelArt: false,
        scene: [MainScene],
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
      {isAdmin && <AdminPanel />}
      {!isAdmin && <Login />}
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
          isLoggedIn ? "hidden" : ""
        }`}
        id="ui"
      >
        <div
          className="hidden absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/10 to-black/40"
          id="backdrop"
        ></div>
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
