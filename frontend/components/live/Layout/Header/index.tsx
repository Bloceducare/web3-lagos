"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "../../../../images/hero.svg";
import { Hall } from "../../../../lib/api";

interface HeaderProps {
  halls?: Hall[];
}

const Header = ({ halls = [] }: HeaderProps) => {
  const router = useRouter();

  const isMainActive = router.pathname === "/live";
  const isArchiveActive = router.pathname === "/archive";
  const activeStage =
    router.pathname === "/live/[stage]"
      ? String(router.query.stage || "")
      : "";

  const stageHalls = halls.filter((h) => {
    const slug = (h.slug || "").toLowerCase();
    const name = h.name.toLowerCase();
    return !(slug.includes("main") || name.includes("main"));
  });

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
            isMainActive
              ? "border-b-2 border-[#0096FF] text-[#0096FF]"
              : "hover:text-[#0096FF]"
          }`}
        >
          Main Stage
        </Link>
        {stageHalls.map((hall) => {
          const slug = hall.slug || "";
          if (!slug) return null;
          const active = activeStage === slug;
          return (
            <Link
              key={hall.id}
              href={`/live/${slug}`}
              className={`transition-all duration-200 ${
                active
                  ? "border-b-2 border-[#0096FF] text-[#0096FF]"
                  : "hover:text-[#0096FF]"
              }`}
            >
              {hall.name}
            </Link>
          );
        })}
        <Link
          href="/archive"
          className={`transition-all duration-200 ${
            isArchiveActive
              ? "border-b-2 border-[#0096FF] text-[#0096FF]"
              : "hover:text-[#0096FF]"
          }`}
        >
          Archive
        </Link>
        <button className="px-5 py-2 text-white rounded-[10px] bg-[#0096FF]">
          <Link target="_blank" href={"https://web3bridge.com/"}>
            About Us
          </Link>
        </button>
      </div>
    </header>
  );
};

export default Header;
