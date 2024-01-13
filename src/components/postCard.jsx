import Image from "next/image";
import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <div className="flex flex-col gap-5 mb-5">
      <div className="flex ">
        {post.img && (
          <div className="relative w-[90%] h-[25rem]">
            <Image
              src={post.img}
              alt=""
              fill
              className="object-cover rounded"
            />
          </div>
        )}
        <span className="text-xs rotate-[270deg] m-auto">
          {post.createdAt.toString().slice(4, 16)}
        </span>
      </div>
      <div className="flex flex-col gap-y-4">
        <h1 className="text-lg w-[90%]">
          {post.title.length > 50 ? post.title.slice(0, 50) + "......" : post.title}
        </h1>
        <p className="font-[300] w-[90%] text-gray-400 text-xs tracking-wide text-justify">
          {post.desc.slice(0, 100) + "......"}
        </p>
        <Link className="font-bold underline" href={`/blog/${post.slug}`}>
          Read More
        </Link>
      </div>
    </div>
  );
}
