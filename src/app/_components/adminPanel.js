"use client";

import { useEffect, useRef, useState } from "react";
import {
  COLORS,
  CanvasHeight,
  CanvasWidth,
  PixelSize,
} from "../_utils/constants";
import { toHexWithLeadingZeros } from "./colorBox";
import { sendFill } from "../_socket/sendFill";

export const AdminPanel = () => {
  const [isPanelShowing, setIsPanelShowing] = useState(false);
  const [isRequestPending, setIsRequestPending] = useState(false);
  const [currentFillColor, setCurrentFillColor] = useState(0x000000);

  const startX = useRef();
  const startY = useRef();
  const endX = useRef();
  const endY = useRef();
  const key = useRef();

  const fillArea = (event) => {
    event.preventDefault();
    setIsRequestPending(true);
    sendFill(
      startX.current.value,
      startY.current.value,
      endX.current.value,
      endY.current.value,
      currentFillColor,
      key.current.value
    ).then((data) => {
      setIsRequestPending(false);
      setIsPanelShowing(false);
    });
  };

  useEffect(() => {
    document.querySelectorAll("[id^='color-']").forEach((button) => {
      button.addEventListener("click", () => {
        setCurrentFillColor(
          toHexWithLeadingZeros(COLORS[button.id.split("-")[1]])
        );
      });
    });
  }, []);

  return (
    <>
      <div
        className="flex justify-center items-center absolute top-4 right-4 w-8 h-8 bg-white hover:bg-slate-200 transition-colors duration-500 rounded-full select-none cursor-pointer container-shadow z-10"
        onClick={() => {
          setIsPanelShowing(
            (currentSetIsPanelShowing) => !currentSetIsPanelShowing
          );
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M680-280q25 0 42.5-17.5T740-340q0-25-17.5-42.5T680-400q-25 0-42.5 17.5T620-340q0 25 17.5 42.5T680-280Zm0 120q31 0 57-14.5t42-38.5q-22-13-47-20t-52-7q-27 0-52 7t-47 20q16 24 42 38.5t57 14.5ZM480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v227q-19-8-39-14.5t-41-9.5v-147l-240-90-240 90v188q0 47 12.5 94t35 89.5Q310-290 342-254t71 60q11 32 29 61t41 52q-1 0-1.5.5t-1.5.5Zm200 0q-83 0-141.5-58.5T480-280q0-83 58.5-141.5T680-480q83 0 141.5 58.5T880-280q0 83-58.5 141.5T680-80ZM480-494Z" />
        </svg>
      </div>
      <div
        className={`flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 md:w-1/3 py-4 px-8 bg-white border-2 border-black pixel-box-shadow select-none z-20 ${
          isPanelShowing ? "" : "hidden"
        }`}
      >
        <h1 className="text-lg font-bold mb-2">Aralık Doldurucu</h1>
        <form onSubmit={fillArea}>
          <div className="flex flex-col mb-3">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Başlangıç X ve Y
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                max={CanvasWidth / PixelSize - 1}
                className="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5"
                placeholder="X giriniz."
                ref={startX}
                required
              />
              <input
                type="number"
                min="0"
                max={CanvasHeight / PixelSize - 1}
                className="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5"
                placeholder="Y giriniz."
                ref={startY}
                required
              />
            </div>
          </div>
          <div className="flex flex-col mb-3">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Bitiş X ve Y
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                max={CanvasWidth / PixelSize - 1}
                className="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5"
                placeholder="X giriniz."
                ref={endX}
                required
              />
              <input
                type="number"
                min="0"
                max={CanvasHeight / PixelSize - 1}
                className="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5"
                placeholder="Y giriniz."
                ref={endY}
                required
              />
            </div>
          </div>
          <div className="flex flex-col mb-3">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Anahtar
            </label>

            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5"
              placeholder="Anahtar giriniz."
              ref={key}
              required
            />
          </div>
          <div className="flex items-center gap-2 mb-3">
            <p>Rengi alt menüden seç:</p>
            <div
              className="w-4 h-4 border border-black"
              style={{
                backgroundColor: `#${toHexWithLeadingZeros(currentFillColor)}`,
              }}
            />
          </div>
          <button
            type="submit"
            className={`text-white ${
              isRequestPending
                ? "bg-orange-700/60 hover:bg-orange-800/60"
                : "bg-orange-700 hover:bg-orange-800"
            } focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center transition-colors duration-500`}
            disabled={isRequestPending}
          >
            Doldur
          </button>
        </form>
      </div>
      <div
        className={`absolute top-0 left-0 w-full h-full bg-black/60 ${
          isPanelShowing ? "" : "hidden"
        }`}
        onClick={() => {
          if (isPanelShowing) {
            setIsPanelShowing(false);
          }
        }}
      ></div>
    </>
  );
};
