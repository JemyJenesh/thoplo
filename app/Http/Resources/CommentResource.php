<?php

namespace App\Http\Resources;

use App\Http\Resources\PostUserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
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
      'user' => new PostUserResource($this->user),
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at,
    ];
  }
}
