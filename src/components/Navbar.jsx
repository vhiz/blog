import Links from "./Links";
import { auth } from "@/lib/auth";
import Link from "next/link";
import MobileNav from "./MobileNav";

export default async function Navbar() {
  const session = await auth();
  
  return (
    <div className="h-[100px] flex items-center justify-between">
      <Link href={"/"} className="text-[1.5rem] xl:text-[2rem] font-bold">
        Blog
      </Link>
      <div className="hidden lg:flex">
        <Links session={session} />
      </div>
      <MobileNav session={session} />
    </div>
  );
}
