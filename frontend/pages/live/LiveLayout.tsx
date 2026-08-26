import Footer from "@/components/live/Layout/Footer";
import Header from "@/components/live/Layout/Header";
import React from "react";
import { Hall } from "@/lib/api";

interface LiveLayoutProps {
  children: React.ReactNode;
  halls?: Hall[];
}

const LiveLayout: React.FC<LiveLayoutProps> = ({ children, halls }) => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <Header halls={halls} />
      {children}
      <Footer />
    </div>
  );
};

export default LiveLayout;
