import Link from "next/link";
import Image from "next/image";
export default function page() {
  return (
    <div className="flex gap-24">
      <div className="flex-1 flex flex-col gap-11">
        <h1 className="text-5xl font-bold leading-[1.2] tracking-wider xl:text-6xl">
          Creative Thoughts Agency.
        </h1>
        <p className="text-[0.9rem]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
          temporibus provident inventore
        </p>
        <div className="flex gap-x-2">
          <Link
            className="p-4 min-w-26 cursor-pointer rounded-md bg-accent"
            href={"/about"}
          >
            Learn More
          </Link>
          <Link
            className="p-4 min-w-26 cursor-pointer rounded-md bg-white text-black"
            href={"/contact"}
          >
            Contact
          </Link>
        </div>
        <div className="relative w-[20rem]  h-12 filter grayscale-[100%] xl:w-[31rem]">
          <Image src={"/brands.png"} fill alt="" className="object-cover" />
        </div>
      </div>
      <div className="relative hidden flex-1 lg:flex">
        <Image src={"/hero.gif"} alt="" fill className=" object-contain" />
      </div>
    </div>
  );
}
