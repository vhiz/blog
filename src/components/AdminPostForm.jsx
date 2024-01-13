"use client";

import { addPost } from "@/lib/action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
export default function AdminPostForm({ session }) {
  const [state, formAction] = useFormState(addPost, undefined);
  const router = useRouter();
  useEffect(() => {
    state?.success && router.push("/blog");
  }, [state, router]);
  return (
    <form action={formAction} className="flex flex-col w-[80vw] gap-y-5">
      <h1 className="text-center text-lg text-gray-500 capitalize">
        Add New Post
      </h1>
      <input
        className="bg-secondary text-white p-2 text-[0.7rem]"
        type="hidden"
        name="email"
        value={session?.user?.email}
      />
      <input
        className="bg-secondary text-white p-2 text-[0.7rem] rounded"
        placeholder="Tittle"
        type="Title"
        name="title"
        required
      />
      <input
        className="bg-secondary text-white p-2 text-[0.7rem] rounded"
        placeholder="enter image url"
        type="text"
        name="img"
      />
      <textarea
        className="bg-secondary text-white p-2 text-[0.7rem] rounded"
        placeholder="Content"
        name="desc"
        cols="30"
        rows="10"
        required
      ></textarea>
      <button className="bg-accent p-2 text-white text-[0.7rem] rounded">
        Create
      </button>
    </form>
  );
}
