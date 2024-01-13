import { deletePost } from "@/lib/action";
import { getPosts } from "@/lib/data";
import Image from "next/image";
export default async function AdminPosts() {
  const posts = await getPosts();
 

  return (
    <div className="w-full flex flex-col gap-5">
      <h1 className="text-gray-500 text-lg">Posts</h1>
      {posts.map((post, i) => (
        <div className="flex items-center justify-between" key={i}>
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full">
              <Image src={post.img || '/noAvatar.png'} alt="" fill className="object-cover rounded-full" />
            </div>
            <span className="text-[0.7rem]">{post.title}</span>
          </div>
          <form action={deletePost}>
            <input type="hidden" name="id" value={post._id} />
            <button className="p-2 bg-red-500 text-[0.7rem] rounded">Delete</button>
          </form>
        </div>
      ))}
    </div>
  );
}
