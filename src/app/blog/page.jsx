import PostCard from "@/components/postCard";
import { getPosts } from "@/lib/data";

export const metadata = {
  title: "Blogs",
  description: "Get the latest updates",
};

// const getData = async () => {
//   const res = await fetch("http://localhost:3000/api/blog");
//   if (!res.ok) {
//     throw new Error("Error");
//   }

//   return res.json();
// };
export default async function Blog() {
  const posts = await getPosts();
  // const posts = await getData();
  return (
    <div className="flex flex-wrap gap-5">
      {posts.map((post, i) => (
        <div key={i} className="w-[100%] lg:w-[30%]">
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}
