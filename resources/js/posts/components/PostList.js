import React from "react";
import Post from "./Post";
import { useIndex } from "../../api";
import PostSkeleton from "./PostSkeleton";

export default function PostList() {
  const { data, isLoading } = useIndex("/posts");

  if (isLoading)
    return (
      <>
        <PostSkeleton />
        <PostSkeleton />
      </>
    );
  const posts = data.data;
  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
