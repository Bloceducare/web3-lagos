import { FiInstagram } from "react-icons/fi";
import { IconWrapper } from "..";

const InstagramIcon = ({ className = "" }) => {
  return (
    <>
      <IconWrapper className={className}>
        <FiInstagram />
      </IconWrapper>
    </>
  );
};

export default InstagramIcon;
