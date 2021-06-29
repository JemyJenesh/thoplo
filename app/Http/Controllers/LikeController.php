<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class LikeController extends Controller
{
  public function store(Post $post)
  {
    if ($post->likedBy(auth()->user())) {
      auth()->user()->likes()->where('post_id', $post->id)->delete();
      return response(null, 200);
    }
    $post->likes()->create([
      'user_id' => auth()->id()
    ]);

    return response(null, 200);
  }
}
