"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks({ item }) {
  const pathName = usePathname();
  return (
    <Link
      href={item.path}
      className={`min-w-[6rem] p-2 rounded-[20px] font-[500] text-center transition-all duration-300 ease-linear ${
        pathName === item.path ? "bg-white text-primary" : null
      }`}
    >
      {item.title}
    </Link>
  );
}
