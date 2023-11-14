import { metadata } from "@/config";
import Head from "next/head";
import React from "react";
interface HeadContentProps {
  title?: string;
  description?: string;
}
const HeadContent = ({ title, description }: HeadContentProps) => {
  return (
    <Head>
      <title>{title || metadata.title}</title>
      <meta name="description" content={description || metadata.description} />
      <meta name="keywords" content="real estate, property, dashboard" />
    </Head>
  );
};

export default HeadContent;
