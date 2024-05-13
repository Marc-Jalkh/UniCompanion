"use client";

import { useEffect } from "react";
import cookies from "js-cookie";

export default function Home() {
  useEffect(() => {
    cookies.remove("sessionToken");
    window.location.href = "/";
  });
  return <div></div>;
}
