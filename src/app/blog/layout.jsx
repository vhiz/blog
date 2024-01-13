import Link from "next/link";
import { IoIosAddCircle } from "react-icons/io";
export default function layout({ children }) {
  return (
    <div>
      {children}
      <div className="sticky bottom-[10vh] right-[15vw]">
        <Link href={"/blog/new-post"} className="text-accent">
          <IoIosAddCircle size={"3rem"} />
        </Link>
      </div>
    </div>
  );
}
