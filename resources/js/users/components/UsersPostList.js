import React from "react";
import Post from "../../posts/components/Post";

export default function UsersPostList({ posts, userId = null }) {
  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} userId={userId} />
      ))}
    </div>
  );
}
