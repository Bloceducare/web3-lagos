import Header from "../headerstats";
import { ReactNode } from "react";
import SideBar from "../hackathon-sidebar/index";
import HackathonHeader from "../hackathon-header";
interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      {/* <HackathonHeader /> */}
      {/* <SideBar /> */}
      <Header/>
      <main className="content-container pt-0">{children}</main>
    </>
  );
};

export default Layout;
