import React from "react";
import { AppProps } from "next/app";
import "../styles/globals.css";
import Settings from "../components/Settings";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Settings />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
