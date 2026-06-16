

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import Header from "@/src/components/Header";
import Scrollable from "@/src/components/Scrollable";
import {ThemeChange} from "@/src/components/themeChange";
// import {ModeToggle} from "@/src/components/ModeToogle";
import {ThemeProvider} from "@/context/ThemeContext";
import React from "react";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}:{children:React.ReactNode}) {
  return (

        <Scrollable>
      

        <Navbar/>
        <Header />
        {children}
        <Footer />

        </Scrollable>
  );
}
