import NavLinks from "./navLinks";
import { handleLogout } from "@/lib/action";


export default async function Links({ session }) {
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

  return (
    <div className="flex items-center gap-x-3">
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
    </div>
  );
}
