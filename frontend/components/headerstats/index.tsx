// // import React from "react";
// // import Link from "next/link";
// // import { headerLink } from "data";
import { useRouter } from "next/router";
// // import Button from "@components/button";

// // function Header() {
// //     const route = useRouter()
// //   return (
// //     <header className="header_padding fixed top-0 left-0 right-0 bg-header shadow-md z-10">
// //       <nav className="flex items-center space-x-12">
// //         <Link href="#">
// //             <Button className="cta_header py-2 px-6 text-[20px] leading-[24px] rounded-lg">Register</Button>
// //         </Link>

// //         <ul className="flex space-x-24 items-center">
// //           {headerLink.map((item) => (
// //           <Link href={item.route}><li className={`text-[20px] leading-[24px] font-${route.pathname === item.route ? 'bold': 'normal' }`}>{item.name}</li></Link>
// //           ))}
// //         </ul>
// //       </nav>
// //     </header>
// //   );
// // }

// // export default Header;


// import React, { useState } from "react";
// import Link from "next/link";
// import { FaBars } from "react-icons/fa";  // Hamburger icon from react-icons
// import { headerLink } from "data";
// import { useRouter } from "next/router";
// import Button from "@components/button";

// function Header() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const route = useRouter();

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   return (
//     <header className="header_padding fixed top-0 left-0 right-0 bg-header shadow-md z-10">
//       <nav className="flex items-center justify-between">
//         <Link href="#">
//           <Button className="cta_header py-2 px-6 text-[20px] leading-[24px] rounded-lg">
//             Register
//           </Button>
//         </Link>

//         {/* Hamburger icon for mobile */}
//         <div className="block lg:hidden">
//           <FaBars onClick={toggleMenu} size={24} color="black" />
//         </div>

//         {/* Navigation links */}
//         <ul
//           className={`${
//             menuOpen ? "flex" : "hidden"
//           } lg:flex space-x-24 items-center`}
//         >
//           {headerLink.map((item) => (
//             <Link href={item.route} key={item.name}>
//               <li
//                 className={`text-[20px] leading-[24px] font-${
//                   route.pathname === item.route ? "bold" : "normal"
//                 }`}
//               >
//                 {item.name}
//               </li>
//             </Link>
//           ))}
//         </ul>
//       </nav>
//     </header>
//   );
// }

// export default Header;

import React, { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa"; // Hamburger and close icons from react-icons
import { headerLink } from "@/data";
import Button from "../button";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const route = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header_padding h-fit p-4 fixed top-0 left-0 right-0 bg-header shadow-md z-10">
      <nav className="flex items-center justify-between">
        <Link href="#">
          <Button className="cta_header py-2 px-6 text-[20px] leading-[24px] rounded-lg">
            Register Here
          </Button>
        </Link>

        {/* Hamburger icon for mobile */}
        <div className="block lg:hidden">
          {menuOpen ? (
            <FaTimes onClick={toggleMenu} size={24} color="black" />
          ) : (
            <FaBars onClick={toggleMenu} size={24} color="black" />
          )}
        </div>

        {/* Navigation links for mobile */}
        <ul
          className={`${
            menuOpen ? "flex flex-col" : "hidden"
          } lg:flex lg:flex-row space-y-10 lg:space-y-0 lg:space-x-24 items-center`}
        >
          {headerLink.map((item) => (
            <Link href={item.route} key={item.name}>
              <li
                className={`text-[20px] leading-[24px] font-${
                  route.pathname === item.route ? "bold" : "normal"
                }`}
              >
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
