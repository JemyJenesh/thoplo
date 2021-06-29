<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css" />

  <title>Thoplo / Login</title>
  <style>
    .login-btn-container {
      display: flex;
      justify-content: center;
    }

    /* Shared */
    .loginBtn {
      text-decoration: none;
      box-sizing: border-box;
      position: relative;
      /* width: 13em;  - apply for fixed size */
      margin: 0.2em;
      padding: 0 15px 0 46px;
      border: none;
      text-align: left;
      line-height: 34px;
      white-space: nowrap;
      border-radius: 0.2em;
      font-size: 16px;
      color: #fff;
    }

    .loginBtn:before {
      content: "";
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      width: 34px;
      height: 100%;
    }

    .loginBtn:focus {
      outline: none;
    }

    .loginBtn:active {
      box-shadow: inset 0 0 0 32px rgba(0, 0, 0, 0.1);
    }

    /* Facebook */
    .loginBtn--facebook {
      background-color: #4c69ba;
      background-image: linear-gradient(#4c69ba, #3b55a0);
      /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
      text-shadow: 0 -1px 0 #354c8c;
    }

    .loginBtn--facebook:before {
      border-right: #364e92 1px solid;
      background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png") 6px 6px no-repeat;
    }

    .loginBtn--facebook:hover,
    .loginBtn--facebook:focus {
      background-color: #5b7bd5;
      background-image: linear-gradient(#5b7bd5, #4864b1);
    }

    /* Google */
    .loginBtn--google {
      /*font-family: "Roboto", Roboto, arial, sans-serif;*/
      background: #dd4b39;
    }

    .loginBtn--google:before {
      border-right: #bb3f30 1px solid;
      background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png") 6px 6px no-repeat;
    }

    .loginBtn--google:hover,
    .loginBtn--google:focus {
      background: #e74b37;
    }

  </style>
</head>

<body>
  <div style="text-align: center; padding: 1rem;">
    <h1>Welcome to Thoplo</h1>
    <p>Splash your imagination in a 32 by 32 canvas! XD</p>
  </div>
  <div class="login-btn-container">
    {{-- <a class="loginBtn loginBtn--facebook" href="/login/facebook">
      Login with Facebook
    </a> --}}

    <a class="loginBtn loginBtn--google" href="/login/google">
      Login with Google
    </a>
  </div>

</body>

</html>
