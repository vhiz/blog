"use client";
import { handleLogout } from "@/lib/action";
import { motion } from "framer-motion";
import { CiMenuFries } from "react-icons/ci";
import NavLinks from "./navLinks";
import { useState } from "react";
const links = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Blog",
    path: "/blog",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];

export default function MobileNav({ session }) {
  const variant = {
    hidden: {
      x: 950,
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.2,
      },
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.2,
      },
    },
  };
  const [open, setopen] = useState(false);

  return (
    <div className="flex lg:hidden">
      <CiMenuFries
        className="text-white font-bold cursor-pointer"
        size={"1.5rem"}
        onClick={() => setopen(true)}
      />
      <motion.div
        variants={variant}
        initial={"hidden"}
        animate={open ? "show" : "hidden"}
        onClick={() => setopen(false)}
        className="fixed top-0 right-0 bg-primary z-10 w-[40vw] h-[100vh] flex flex-col gap-y-2 items-center justify-center"
      >
        {links.map((link, i) => (
          <NavLinks key={i} item={link} />
        ))}
        {session?.user ? (
          <>
            {session?.user?.isAdmin && (
              <NavLinks item={{ title: "Admin", path: "/admin" }} />
            )}
            <form action={handleLogout}>
              <button className="p-2 cursor-pointer font-bold bg-white text-primary">
                Logout
              </button>
            </form>
          </>
        ) : (
          <NavLinks item={{ title: "Login", path: "/login" }} />
        )}
      </motion.div>
    </div>
  );
}
