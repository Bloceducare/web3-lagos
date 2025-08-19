import Footer from "@/components/live/Layout/Footer";
import Header from "@/components/live/Layout/Header";
import React from "react";

interface LiveLayoutProps {
  children: React.ReactNode;
}

const LiveLayout: React.FC<LiveLayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default LiveLayout;
