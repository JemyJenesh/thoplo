<?php

namespace App\Http\Resources;

use App\Http\Resources\CommentResource;
use App\Http\Resources\PostUserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array
   */
  public function toArray($request)
  {
    return [
      'id' => $this->id,
      'body' => $this->body,
      'board' => json_decode($this->board),
      'user' => new PostUserResource($this->user),
      'comments' => CommentResource::collection($this->comments()->latest()->get()),
      'likes_count' => count($this->likes),
      'comments_count' => count($this->comments),
      'has_user_liked' => auth()->check() ? $this->likedBy(auth()->user('api')) : false,
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at,
    ];
  }
}
