import React from "react";
import Post from "./Post";
import { useIndex } from "../../../api";

export default function PostList() {
  const { data, isLoading } = useIndex("api/v1/posts");

  if (isLoading) return <div>...loading...</div>;
  return (
    <div>
      {data.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
