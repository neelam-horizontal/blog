import { Layout } from "@/components";
import "@/styles/globals.css";
import React, { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
