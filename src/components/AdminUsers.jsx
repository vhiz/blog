import { deleteUser } from "@/lib/action";
import { getUsers } from "@/lib/data";
import Image from "next/image";

export default async function AdminUsers() {
  const users = await getUsers();
  return (
    <div className="w-full flex flex-col gap-5">
      <h1 className="text-gray-500 text-lg">Users</h1>
      {users.map((user, i) => (
        <div className="flex items-center justify-between" key={i}>
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12">
              <Image
                src={user.img || "/noAvatar.png"}
                alt=""
                fill
                className="object-cover rounded-full"
              />
            </div>
            <span className="text-[0.7rem]">{user.username}</span>
          </div>
          <form action={deleteUser}>
            <input type="hidden" name="id" value={user._id} />
            <button className="p-2 bg-red-500 text-[0.7rem] rounded">
              Delete
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}
