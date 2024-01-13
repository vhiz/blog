import React from "react";

export default function loading() {
  return (
    <div className="flex flex-wrap gap-5">
      {Array(7)
        .fill()
        .map((item, i) => (
          <div key={i} className="w-[100%] lg:w-[30%]">
            <div className="flex flex-col gap-5 mb-5">
              <div className="w-[90%] h-[20rem] rounded-md bg-secondary animate-pulse duration-300"></div>
              <div className="w-[45%] animate-pulse duration-300 bg-secondary h-[2rem] rounded-md"></div>
              <div className="w-[70%] animate-pulse duration-300 bg-secondary h-[2rem] rounded-md"></div>
            </div>
          </div>
        ))}
    </div>
  );
}
