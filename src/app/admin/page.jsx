import AdminPosts from "@/components/AdminPosts";
import AdminUsers from "@/components/AdminUsers";
import React, { Suspense } from "react";

export default function Admin() {
  return (
    <div className="w-full flex flex-col gap-12">
      <div className="w-full ">
        <div className="col">
          <Suspense fallback={<div>loading...</div>}>
            <AdminPosts />
          </Suspense>
        </div>
      </div>
      <div className=" w-full">
        <div className="col">
          <Suspense fallback={<div>loading...</div>}>
            <AdminUsers />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
