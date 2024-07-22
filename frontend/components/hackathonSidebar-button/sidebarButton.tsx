import { ReactNode } from "react";
import classNames from "@/utils/classNames";

interface Props {
  children: ReactNode;
  variant?: string;
  className?: string;
}

const text = "";
const SidebarButton = ({ children, variant = "ghost", className='gap-2' }: Props) => {
  const varType = (type: string) => {
    if (type === "primary") {
      return "bg-red-500 text-white";
    }

    return "";
  };
  return (
    <>
      <button
        className={classNames(
          `${varType(variant)} ${className}`,
          "border-0 p-2"
        )}
      >
        {children}
      </button>
    </>
  );
};

export default SidebarButton;
