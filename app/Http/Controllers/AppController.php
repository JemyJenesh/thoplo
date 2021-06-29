<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class AppController extends Controller
{
  public function getApp()
  {
    return view('app');
  }

  public function login()
  {
    return view('login');
  }

  public function getSocialRedirect($account)
  {
    try {
      return Socialite::with($account)->redirect();
    } catch (\InvalidArgumentException $e) {
      return redirect('/login');
    }
  }

  public function getSocialCallback($account)
  {
    /*
        Grabs the user who authenticated via social account.
      */
    $socialUser = Socialite::with($account)->user();

    /*
            Gets the user in our database where the provider ID
            returned matches a user we have stored.
        */
    $user = User::where('provider_id', '=', $socialUser->id)
      ->where('provider', '=', $account)
      ->first();

    /*
        Checks to see if a user exists. If not we need to create the
        user in the database before logging them in.
      */
    if ($user == null) {
      $newUser = new User();

      $newUser->name        = $socialUser->getName();
      $newUser->email       = $socialUser->getEmail() == '' ? '' : $socialUser->getEmail();
      $newUser->avatar      = $socialUser->getAvatar();
      $newUser->username    = $socialUser->getId();
      $newUser->password    = '';
      $newUser->provider    = $account;
      $newUser->provider_id = $socialUser->getId();

      $newUser->save();

      $user = $newUser;
    }

    Auth::login($user);

    return redirect('/');
  }
}
