"use client";

import { useRef, useState } from "react";
import { sendInviteLink } from "../_requests/sendInviteLink";

export const Login = () => {
  const [isLoginShowing, setIsLoginShowing] = useState(false);
  const [isKVKKShowing, setIsKVKKShowing] = useState(false);
  const [canSendRequest, setCanSendRequest] = useState(false);
  const [hasRegistered, setHasRegistered] = useState(false);
  const email = useRef("");
  const kvkkCheckbox = useRef("");

  const handleForm = (event) => {
    event.preventDefault();
    setCanSendRequest(false);
    sendInviteLink(email.current.value).then((data) => {
      setCanSendRequest(kvkkCheckbox.current.checked);
      setHasRegistered(true);
    });
  };

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
        className={`flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 md:w-1/3 max-h-[80vh] py-4 px-8 bg-white border-2 border-black pixel-box-shadow select-none z-20 overflow-y-auto scrollbar ${
          isLoginShowing || isKVKKShowing ? "" : "hidden"
        }`}
      >
        <h1 className="text-lg font-bold mb-2">
          {isKVKKShowing
            ? "Kişisel Verilerin Korunması ve İşlenmesine İlişkin Aydınlatma Metni"
            : "Giriş Yap"}
        </h1>
        {isKVKKShowing && (
          <form
            onSubmit={() => {
              setCanSendRequest(false);
              setIsKVKKShowing(false);
            }}
          >
            <p class="text-sm mb-4">
              Yıldız Teknik Üniversitesi SKY LAB: Bilgisayar Bilimleri Kulübü
              (“SKY LAB" veya “Kulüp”) olarak, "YıldızPlace" adlı oyunumuz
              kapsamında işlenen kişisel verilerinizin korunmasına büyük önem
              vermekteyiz. 6698 sayılı Kişisel Verilerin Korunması Kanunu
              (“KVKK”) uyarınca, kişisel verilerinizin işlenmesi ve korunmasına
              ilişkin aşağıdaki bilgilendirmeyi sunarız.
            </p>
            <p class="text-sm mb-4">
              Kişisel verileriniz, e-posta adresi, IP adresi, giriş/ziyaret saat
              bilgileri gibi verilerden oluşmaktadır. Bu veriler, yalnızca oyuna
              erişiminizi sağlamak, sistem güvenliğini temin etmek ve teknik
              destek hizmetlerini sunmak amacıyla işlenmektedir.
            </p>
            <p class="text-sm mb-4">
              Kişisel verileriniz, SKY LAB bünyesinde saklanmakta olup üçüncü
              kişilerle paylaşılmamaktadır. Ancak, müstehcenlik, saldırganlık,
              ırkçı söylemler veya cinsellik içeren durumların tespiti halinde
              veya üniversite tarafından yasal bir bilgi talebi gelmesi
              durumunda, ilgili kişisel veriler Yıldız Teknik Üniversitesi ile
              paylaşılabilecektir.
            </p>
            <p class="text-sm mb-4">
              Kişisel verileriniz, SKY LAB tarafından saklanmakta olup bu
              verilerin saklanmasına ilişkin tüm haklar SKY LAB'e aittir. SKY
              LAB, aksini belirtmediği müddetçe verilerinizi saklamaya devam
              edecektir.
            </p>
            <p class="text-sm mb-4">
              Kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse
              buna ilişkin bilgi talep etme, kişisel verilerinizin işlenme
              amacını öğrenme gibi haklarınız için bize her zaman
              ulaşabilirsiniz.
            </p>
            <button
              type="submit"
              className={`text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center transition-colors duration-500`}
            >
              Kapat
            </button>
          </form>
        )}
        {!isKVKKShowing && (
          <form onSubmit={handleForm}>
            <div className="mb-3">
              Etkinliğe katılmak için, lütfen aşağıdaki forma e-posta adresinizi
              girin. Ardından, e-posta adresinize bir giriş bağlantısı
              alacaksınız. Bu bağlantıya tıklayarak etkinliğimize katılabilir ve
              üniversitemizin sanal duvarını oluşturabilirsiniz!
            </div>
            <div className="mb-3 text-xs font-semibold text-orange-700">
              Okul e-posta adreslerine gönderilen postaların gelen kutusuna
              ulaşması yaklaşık 15 dakika kadar gecikebilmektedir. Kayıt
              işleminizi gerçekleştirirken lütfen bu durumu dikkate alınız.
            </div>
            <div className="flex flex-col mb-3">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                E-Postanız
              </label>

              <input
                type="email"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5`}
                placeholder="E-postanızı giriniz."
                required
                ref={email}
              />
            </div>
            {hasRegistered && (
              <div className="mb-3 text-green-600 text-sm font-semibold">
                Başarıyla kayıt oldunuz. E-postanızı kontrol edin.
              </div>
            )}
            <div class="mb-3 flex items-center">
              <input
                type="checkbox"
                id="kvkk-checkbox"
                class="mr-2"
                ref={kvkkCheckbox}
                onClick={() =>
                  setCanSendRequest((lastCanSendRequest) => !lastCanSendRequest)
                }
              />
              <label
                class="text-sm cursor-pointer underline"
                onClick={() => setIsKVKKShowing(true)}
              >
                KVKK metnini okudum ve onaylıyorum.
              </label>
            </div>
            <button
              type="submit"
              className={`text-white ${
                canSendRequest
                  ? "bg-orange-700 hover:bg-orange-800"
                  : "bg-orange-700/60 hover:bg-orange-800/60"
              } focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center transition-colors duration-500`}
              disabled={!canSendRequest}
            >
              Katılım Bağlantısını Gönder
            </button>
          </form>
        )}
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
            setIsKVKKShowing(false);
          }
        }}
      ></div>
    </>
  );
};
