<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @param  \App\Models\Post  $post
   * @return \Illuminate\Http\Response
   */
  public function index(Post $post)
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Post  $post
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request, Post $post)
  {
    $comment = $post->comments()->create([
      'body' => $request->body,
      'user_id' => auth()->id()
    ]);

    return new CommentResource($comment);
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Post  $post
   * @param  \App\Models\Comment  $comment
   * @return \Illuminate\Http\Response
   */
  public function show(Post $post, Comment $comment)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Post  $post
   * @param  \App\Models\Comment  $comment
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Post $post, Comment $comment)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Post  $post
   * @param  \App\Models\Comment  $comment
   * @return \Illuminate\Http\Response
   */
  public function destroy(Post $post, Comment $comment)
  {
    //
  }
}
