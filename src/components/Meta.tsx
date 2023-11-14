import { metadata } from "@/config";
import Head from "next/head";
import React from "react";

const Meta = () => {
  return (
    <Head>
      <title>Real Estate Admin management</title>
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content="real estate, property, dashboard" />
    </Head>
  );
};

export default Meta;
