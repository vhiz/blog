import UserDetails from "@/components/UserDetails";
import { auth } from "@/lib/auth";
import { getPost } from "@/lib/data";
import Image from "next/image";
import { Suspense } from "react";

// const getData = async (slug) => {
//   const res = await fetch(`http://localhost:3000/api/blog/${slug}`);
//   if (!res.ok) throw new Error(error);

//   return res.json();
// };

export const generateMetadata = async ({ params }) => {
  const { slug } = params;

  // const post = await getPost(slug);
  const post = await getPost(slug);
  // const post = await getData(slug);

  return {
    title: post.title,
    description: post.desc,
  };
};

export default async function SinglePost({ params }) {
  const { slug } = params;
  const post = await getPost(slug);
  const session = await auth();

  return (
    <div className="flex gap-24 flex-col lg:flex-row">
      {post.img && (
        <div className="h-[20rem] w-full relative lg:h-[80vh] lg:flex-1">
          <Image src={post.img} alt="" fill className="object-cover" />
        </div>
      )}
      <div className="flex-[2] flex flex-col gap-y-12">
        <h1 className="font-bold text-5xl">{post.title}</h1>
        <div className="flex items-center gap-5 text-[0.7rem]">
          <Suspense fallback={<div>loading...</div>}>
            <UserDetails
              userId={post.userId}
              session={session}
              postId={post._id}
              post={post}
            />
          </Suspense>
        </div>
        <div className="text-[0.9rem] text-justify">{post.desc}</div>
      </div>
    </div>
  );
}
