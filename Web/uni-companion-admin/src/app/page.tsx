"use client";
import styles from "../styles/page.module.css";
import Head from "next/head";
import LoginForm from "@components/components/Forms/LoginForm";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        
        <Container
          sx={{
            height: "100vh",
            width: "100vw",
            alignContent: "center",
          }}
          maxWidth="sm"
        >
          <LoginForm />
        </Container>
      </main>
    </div>
  );
}
