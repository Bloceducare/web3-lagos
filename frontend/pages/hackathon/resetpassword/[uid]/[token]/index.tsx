import ResetPassword from "@/views/hackathon/ResetPassword";
import { useRouter } from 'next/router'


const Resetpassword = () => {
  const router = useRouter()
  const uid =router.query.uid
  const token = router.query.token
  return (
    <>
      <ResetPassword />
    </>
  );
};

export default Resetpassword;