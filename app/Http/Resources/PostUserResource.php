<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostUserResource extends JsonResource
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
      'posts_count' => count($this->posts),
      'received_likes_count' => count($this->receivedLikes),
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at,
    ];
  }
}
