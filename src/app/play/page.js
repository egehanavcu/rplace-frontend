"use client";

import { useSearchParams } from "next/navigation";
//import { useRouter } from "next/router";
const { useEffect } = require("react");

export default function AuthenticationPage() {
  //const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  console.log("TOKEN BU ", token);

  if (token) {
    useEffect(() => {
      return fetch(
        `https://backend.egehan.dev/api/users/login?token=${token}`,
        { credentials: "include" }
      )
        .then((response) => response.json())
        .then((receivedData) => {
          console.log("oluşturuldu");
          //router.push("/");
        })
        .catch((error) => console.error("Parsing error: ", error));
    }, []);

    return <b className="text-white">Yönlendirilirken lütfen bekleyiniz.</b>;
  }
}
