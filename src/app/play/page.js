"use client";

import { useSearchParams } from "next/navigation";

const { useEffect } = require("react");

export default function AuthenticationPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (token) {
    useEffect(() => {
      return fetch(
        `https://backend.egehan.dev/api/users/login?token=${token}`,
        {
          credentials: "include",
        }
      )
        .then((response) => response.json())
        .then((receivedData) => {
          window.location.href = "/";
        })
        .catch((error) => console.error("Parsing error: ", error));
    }, []);

    return (
      <div className="flex flex-col justify-center items-center gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <img src="/images/loading.gif" className="w-28 h-28" />
        <b className="text-2xl text-white text-center select-none">
          Yönlendirilirken lütfen bekleyiniz...
        </b>
      </div>
    );
  }
}
