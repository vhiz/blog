import { getUser } from "@/lib/data";
import Image from "next/image";
import DeletPost from "./DeletPost";

export default async function UserDetails({ userId, session, post }) {
  const user = await getUser(userId);

  return (
    <>
      <div className="relative w-12 h-12">
        <Image
          src={user.img ? user.img : "/noavatar.png"}
          alt=""
          fill
          className="object-cover rounded-full"
        />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <span className="text-gray-400 font-bold">Author</span>
        <span className="font-[500]">{user.username}</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <span className="text-gray-400 font-bold">Published</span>
        <span className="font-[500]">
          {post.createdAt.toString().slice(4, 16)}
        </span>
      </div>
      {session?.user?.email === user.email && <DeletPost post={post} />}
    </>
  );
}
