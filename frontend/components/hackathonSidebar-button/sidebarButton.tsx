import { ReactNode } from "react";
import { IoHomeOutline } from "react-icons/io5";

interface Props {
  children: ReactNode;
  variant?: string;
  className?: string;
}

const SidebarButton = () {

  return (
    <>
      <button  variant="ghost" className="gap-2">
            <IoHomeOutline />
            <p className="text-center">Home</p>

      </button>
    </>
  )
};

export default SidebarButton;
