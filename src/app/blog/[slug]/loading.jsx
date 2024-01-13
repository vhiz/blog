
export default function loading() {
  return (
    <div className="flex gap-24 flex-col lg:flex-row">
      <div className="h-[20rem] w-full relative lg:h-[80vh] lg:flex-1 bg-secondary animate-pulse"></div>

      <div className="flex-[2] flex flex-col gap-y-12">
        <div className="w-full bg-secondary h-[6rem] animate-pulse"></div>
        <div className="flex items-center gap-5 w-[70%] h-[2rem] bg-secondary animate-pulse"></div>
        <div className="text-[0.9rem] text-justify bg-secondary rounded-md h-[20rem] animate-pulse"></div>
      </div>
    </div>
  );
}
