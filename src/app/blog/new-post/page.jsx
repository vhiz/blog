import AdminPostForm from "@/components/AdminPostForm";
import { auth } from "@/lib/auth";
import React from "react";

export default async function NewPost() {
  const session = await auth();
  return (
    <div className="flex items-center justify-center">
      <AdminPostForm session={session} />
    </div>
  );
}
