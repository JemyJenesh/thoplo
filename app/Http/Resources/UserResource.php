<?php

namespace App\Http\Resources;

use App\Http\Resources\PostResource;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
      'name' => $this->name,
      'email' => $this->email,
      'avatar' => $this->avatar,
      'username' => $this->username,
      $this->mergeWhen($request->user, [
        'posts' => PostResource::collection($this->posts()->latest()->get()),
        'posts_count' => count($this->posts),
        'received_likes_count' => count($this->receivedLikes),
      ]),
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at,
    ];
  }
}
