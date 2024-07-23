import { ReactNode } from "react";
import { IoHomeOutline } from "react-icons/io5";

interface Props {
  children?: ReactNode;
  className?: string;
}

const SidebarButton: React.FC<Props> = ({ children, className = "" }) => {
  return (
    <button className={`gap-2 ${className}`}>
      <IoHomeOutline />
      <p className="text-center">Home</p>
      {children}
    </button>
  );
};

export default SidebarButton;
