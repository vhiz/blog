"use client";
import Image from "next/image";
export default function Contact() {
  return (
    <div className="flex items-center gap-24">
      <div className="relative hidden flex-1 h-[30rem] lg:flex">
        <Image src={"/contact.png"} alt="" fill className="object-contain" />
      </div>
      <div className="flex-1">
        <form className="flex flex-col gap-y-5">
          <input
            type="text"
            className="p-3 text-[0.7rem] outline-accent rounded bg-secondary text-white"
            placeholder="Name And Surname"
          />
          <input
            type="text"
            className="p-3 text-[0.7rem] outline-accent rounded bg-secondary text-white"
            placeholder="Email"
          />
          <input
            type="text"
            className="p-3 text-[0.7rem] outline-accent rounded bg-secondary text-white"
            placeholder="Phone No"
          />
          <textarea
            name=""
            className="p-3 text-[0.7rem] outline-accent rounded bg-secondary text-white"
            id=""
            cols="30"
            rows="10"
            placeholder="Message"
          ></textarea>
          <button
            onClick={(e) => e.preventDefault()}
            className="p-3 bg-accent text-white rounded"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
