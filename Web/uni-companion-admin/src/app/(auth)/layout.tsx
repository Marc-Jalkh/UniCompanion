"use client";
import "../../styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import cookies from "js-cookie";
import Heading from "@components/components/Header/Heading";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check session from cookies
    const sessionToken = cookies.get("sessionToken"); // Get sessionToken from cookie
    if (sessionToken) {
      // If sessionToken exists, user is authenticated
      setIsAuthenticated(true);
    } else {
      // Redirect to login page if not authenticated
      router.push("/");
    }
  }, [router]);

  return <div>
    <Heading />
    <br style={{height: 0}} />
    {isAuthenticated && children}</div>;
}
