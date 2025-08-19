"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "../../../../images/hero.svg";

const Header = () => {
  const router = useRouter();

  const isActive = (path: string) => {
    if (path === "/live" && router.pathname === "/live") {
      return true;
    }
    if (
      path === "/live/emerald" &&
      router.pathname === "/live/[stage]" &&
      router.query.stage === "emerald"
    ) {
      return true;
    }
    if (path === "/archive" && router.pathname === "/archive") {
      return true;
    }
    return false;
  };

  return (
    <header className="max-w-7xl p-4 flex justify-between sticky top-0 bg-[#ffffff] w-full mx-auto shadow-sm z-50">
      <Link href="/">
        <Image
          src={Logo}
          alt="Web3bridge Logo"
          width={0}
          height={0}
          className="w-[50px] md:w-[150px] xl:w-[165px]"
        />
      </Link>
      <div className="flex flex-wrap lg:flex-nowrap justify-between text-[14px] font-medium lg:text-base items-center gap-6 mt-4 md:mt-0">
        <Link
          href="/live"
          className={`transition-all duration-200 ${
            isActive("/live")
              ? "border-b-2 border-[#0096FF] text-[#0096FF]"
              : "hover:text-[#0096FF]"
          }`}
        >
          Main Stage
        </Link>
        <Link
          href="/live/emerald"
          className={`transition-all duration-200 ${
            isActive("/live/emerald")
              ? "border-b-2 border-[#0096FF] text-[#0096FF]"
              : "hover:text-[#0096FF]"
          }`}
        >
          Emerald
        </Link>
        <Link
          href="/archive"
          className={`transition-all duration-200 ${
            isActive("/archive")
              ? "border-b-2 border-[#0096FF] text-[#0096FF]"
              : "hover:text-[#0096FF]"
          }`}
        >
          Archive
        </Link>
        <button className="px-5 py-2 text-white rounded-[10px] bg-[#0096FF]">
          <Link target="_blank" href={"https://web3bridge.com/"}>
            Join the next Cohort
          </Link>
        </button>
      </div>
    </header>
  );
};

export default Header;
