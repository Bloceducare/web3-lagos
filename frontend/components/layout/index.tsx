import Header from "../headerstats";
import { ReactNode } from "react";


interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header/>
      <main className="content-container pt-0">{children}</main>
    </>
  );
};

export default Layout;
