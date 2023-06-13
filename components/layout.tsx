import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
// import Header from "../components/header";
// import { motion, AnimatePresence } from "framer-motion";
// import { useInView } from "react-intersection-observer";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Old Movies | Carla Heywood" }: Props) => {
  return (
    <div className="overflow-x-hidden">
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content="Old Movies | Carla Heywood" />
        <meta name="description" content="Old Movies | Carla Heywood"></meta>
        <meta property="og:url" content="" />
        <meta property="og:type" content="website" />
      </Head>
      <main className="bg-curtain bg-fixed bg-no-repeat">{children}</main>
    </div>
  );
};

  export default Layout;