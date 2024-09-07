import HomePage from "@/views/Livestream/homePage/HomePage";
import Header from "../../components/livestream/Header";
import Footer from "../../components/livestream/Footer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Home() {
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    router.push("/livestream/ruby"); // Perform the redirect
  }, [router]);
  // return (
  //   <div className="bg-gradient-to-b from-[#ffffff] to-[#ECF3FE]">
  //     <Header />
  //     <HomePage />

  //     <Footer />
  //   </div>
  // );
}

export default Home;
