"use client";

import { MdDelete } from "react-icons/md";
import { deletePost } from "@/lib/action";
import { useRouter } from "next/navigation";
export default function DeletPost({ post }) {
  const router = useRouter();
  const deleteSinglePost = (id) => {
    deletePost(id);
    router.replace("/blog");
  };
  return (
    <form action={() => deleteSinglePost(post._id)}>
      <button>
        <MdDelete className="text-[2rem] text-red-400" />
      </button>
    </form>
  );
}
