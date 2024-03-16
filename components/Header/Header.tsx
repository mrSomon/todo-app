import React from "react";
import TopBarHeader from "./bars/TopBarHeader";
import BottomBarHeader from "./bars/BottomBarHeader";
import Link from "next/link";
import NavBar from "../navs/NavBar";

const navs = [
  { id: 1, link: "/", title: "Home" },
  { id: 2, link: "/", title: "First" },
  { id: 3, link: "/", title: "Second" },
  { id: 4, link: "/", title: "Third" },
];

const Header = () => {
  return <NavBar navs={navs} />

  // return (
  //   <header className="text-gray-600 body-font">
  //     <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
  //       <Link
  //         href={"/"}
  //         className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
  //       >
  //         <span className="ml-3 text-xl">Logo</span>
  //       </Link>
  //       <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
  //         <ul className="flex">
  //           {navs.map((e) => (
  //             <li key={e.id}>
  //               <Link
  //                 href={e.link}
  //                 className="mr-5 font-medium hover:cursor-pointer hover:text-gray-900 "
  //               >
  //                 {e.title}
  //               </Link>
  //             </li>
  //           ))}
  //         </ul>
  //       </nav>
  //       <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
  //         Button
  //         <svg
  //           fill="none"
  //           stroke="currentColor"
  //           stroke-linecap="round"
  //           stroke-linejoin="round"
  //           stroke-width="2"
  //           className="w-4 h-4 ml-1"
  //           viewBox="0 0 24 24"
  //         >
  //           <path d="M5 12h14M12 5l7 7-7 7"></path>
  //         </svg>
  //       </button>
  //     </div>
  //   </header>
  // );

  // return (
  //   <header className="header">
  //     <TopBarHeader />

  //     <BottomBarHeader />
  //   </header>
  // )
};

export default Header;
