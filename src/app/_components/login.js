"use client";

import { useState } from "react";

export const Login = () => {
  const [isLoginShowing, setIsLoginShowing] = useState(false);
  const [isRequestPending, setIsRequestPending] = useState(false);
  return (
    <>
      <div
        className="flex justify-center items-center absolute top-4 right-4 w-8 h-8 bg-white hover:bg-slate-200 transition-colors duration-500 rounded-full select-none cursor-pointer container-shadow z-10"
        onClick={() => {
          setIsLoginShowing((currentIsLoginShowing) => !currentIsLoginShowing);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
        </svg>
      </div>
      <div
        className={`flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 md:w-1/3 py-4 px-8 bg-white border-2 border-black pixel-box-shadow select-none z-20 ${
          isLoginShowing ? "" : "hidden"
        }`}
      >
        <h1 className="text-lg font-bold mb-2">Giriş Yap</h1>
        <form>
          <div className="mb-3">
            Etkinliğe katılmak için, lütfen aşağıdaki forma üniversite e-posta
            adresinizi girin. Ardından, e-posta adresinize bir giriş bağlantısı
            alacaksınız. Bu bağlantıya tıklayarak etkinliğimize katılabilir ve
            üniversitemizin sanal duvarını oluşturabilirsiniz!
          </div>
          <div className="flex flex-col mb-3">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Üniversite E-Postanız
            </label>

            <input
              type="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5"
              placeholder="YTU e-postanızı giriniz."
              required
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
            Katılım Bağlantısını Gönder
          </button>
        </form>
      </div>
      <div
        className="flex justify-center absolute bottom-4 left-1/2 -translate-x-1/2 px-2 py-1 bg-orange-700 hover:bg-orange-800 text-white border-2 border-black pixel-box-shadow cursor-pointer select-none transition-colors duration-500"
        onClick={() => {
          setIsLoginShowing((currentIsLoginShowing) => !currentIsLoginShowing);
        }}
      >
        Piksel eklemek için giriş yap.
      </div>
      <div
        className={`absolute top-0 left-0 w-full h-full bg-black/60 ${
          isLoginShowing ? "" : "hidden"
        }`}
        onClick={() => {
          if (isLoginShowing) {
            setIsLoginShowing(false);
          }
        }}
      ></div>
    </>
  );
};
