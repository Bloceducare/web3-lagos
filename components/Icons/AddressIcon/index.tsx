import { HiCalendar } from "react-icons/hi";
import { IconWrapper } from "..";

const AddressIcon = ({ className = "" }) => {
  return (
    <>
      <IconWrapper className={className}>
        <HiCalendar />
      </IconWrapper>
    </>
  );
};

export default AddressIcon;
