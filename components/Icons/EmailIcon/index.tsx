import { FiMail } from "react-icons/fi";
import { IconWrapper } from ".."


 const EmailIcon = ({className=''})=>{
    return (<>
    <IconWrapper className={className}>
      <FiMail />
    </IconWrapper>
      </>)
  }

export default EmailIcon

