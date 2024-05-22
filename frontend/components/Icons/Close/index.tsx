import { AiOutlineClose } from "react-icons/ai";
import { IconWrapper } from "..";

const CLoseIcon = ({ className = "" }) => {
  return (
    <>
      <IconWrapper className={className}>
        <AiOutlineClose />
      </IconWrapper>
    </>
  );
};

export default CLoseIcon;
