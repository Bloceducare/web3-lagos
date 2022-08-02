import { FiTwitter } from "react-icons/fi";
import { IconWrapper } from ".."


 const TwitterIcon = ({className=''})=>{
    return (<>
    <IconWrapper className={className}>
      <FiTwitter />
    </IconWrapper>
      </>)
  }

export default TwitterIcon

