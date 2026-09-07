import ResetPassword from "@/views/hackathon/ResetPassword";

/** uid/token come from query string: /hackathon/resetpassword?uid=…&token=… */
const Resetpassword = () => {
  return <ResetPassword />;
};

export default Resetpassword;
