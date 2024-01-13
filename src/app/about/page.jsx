import Image from "next/image";

export const metadata = {
  title: "About Us",
  description: "Description About us",
};

export default function About() {
  return (
    <div className="flex gap-24">
      <div className="flex-1 flex flex-col gap-y-12">
        <h2 className="text-accent font-bold text-lg">About Agency</h2>
        <h1 className="text-4xl font-bold">
          We create digital ideas that are bigger, bolder, braver and better.
        </h1>
        <p className="text-[0.9rem] font-light">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea
          consectetur dolores labore, perspiciatis quidem similique. Incidunt
          dignissimos quae cupiditate ullam temporibus, soluta reiciendis
          sapiente. Non dignissimos sit omnis enim eum.
        </p>
        <div className="flex justify-center gap-5 items-center w-full flex-wrap md:justify-between">
          {Array(3)
            .fill()
            .map((box, i) => (
              <div key={i} className="flex flex-col gap-y-1 items-center">
                <h1 className="text-accent font-bold text-lg">10k +</h1>
                <p className="text-[0.7rem]">Years of experience</p>
              </div>
            ))}
        </div>
      </div>
      <div className="relative hidden flex-1 lg:flex">
        <Image src={"/about.png"} alt="" fill className="object-cover lg:object-contain" />
      </div>
    </div>
  );
}
