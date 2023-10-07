import Header from "@components/headerstats/index";
import { ReactNode } from "react";


interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header/>
      <main className="content-container">{children}</main>
    </>
  );
};

export default Layout;
