<?php include "includes/init.php" ?>
<?php
  if ($_SERVER['REQUEST_METHOD']=='POST') {
    $email=$_POST['email'];
    $password=$_POST['password'];
    // for when remeber me is ticked
    if (isset($_POST['remember'])) {
      $remember = "on";
    } else {
      $remember = "off";
    }
    if (count_field_val($pdo, "users", "email", $email)>0) {
      $user_data = return_user_field_data($pdo, "email", $email);
      if ($user_data['active']==1) {
        if (password_verify($password, $user_data['password'])) {
          set_msg("Logged in succesfully", "success");
          $_SESSION['username']=$user_data['username'];
          if ($remember='on') {
            // time is time+seconds to give exp time, currently 8hrs
            setcookie("username", $user_data['username'], time()+28800);
            $cookie_exp = true;
          } else {
            $cookie_exp = false;
          }
          $username = $_SESSION['username'];
          $last_page = isset($_SERVER['SCRIPT_NAME']) ? $_SERVER['SCRIPT_NAME'] : (isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '');
          $user_ip = $_SERVER['REMOTE_ADDR'];
          $user_host = isset($_SERVER['REMOTE_HOST']) ? $_SERVER['REMOTE_HOST'] : '';
          $user_port = $_SERVER['REMOTE_PORT'];
          user_login_session_start($pdo, $username, $cookie_exp, $last_page, $user_ip, $user_host, $user_port );
          // tempory place for update since we know db must be active at this stage, might automate/timed script in the future
          transfer_logs($pdo);

          redirect("gis.php");
        } else {
          set_msg("Password is invalid");
          $forgot_password = true;          
        }
      } else {
        set_msg("Your account '{$email}' has not yet been activated by an admin");        
      }
    } else {
      set_msg("User '{$email}' does not exist");
    }
  } else {
    $email="";
    $password="";
  }




?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" href="./GIS Page/Pictures/Navbar/Logo.png"/>
  <title>COREGIS</title>

  <!-- BOOTSTRAP -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
  <!-- CSS -->
  <link rel="stylesheet" href="css/login_style.css">

  <!-- Add CSS for background image -->
  <style>
    body {
      background-image: url('./resources/LoginBackground.png');
      background-size: cover; /* Ensure the background image covers the entire background */
      background-position: center;
      background-attachment: fixed; /* Optional: Keep the background fixed while scrolling */
    }
    



    .logo-overlay {
  position: absolute;
  top: 40%; /* Adjust as needed */
  left: 50%; /* Adjust as needed */
  transform: translate(-50%, -75%); /* Center the image */
  z-index: 1;
}

/* Additional styles to move the image */
@media (min-width: 768px) { /* Adjust for larger screens */
  .logo-overlay {
    top: 30%; /* Adjust as needed */
  }
}

    .home-button {
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 2;
    }
  </style>
</head>
<body class="d-flex align-items-center py-4 bg-body-tertiary">

<main class="form-signin w-100 m-auto container-sm">
  <a class="btn btn-primary btn-sm home-button" href="./index.php">CES Home</a>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <div class="position-relative">
    <img class="mx-auto d-block logo-overlay" src="./resources/CES_Logo_Fill.png" alt="" width="800" height="auto">
  </div>

  <form class="mx-auto col-lg-4 col-md-8"  method="post" >
    <h2 class="h1 mb-3  text-center">Log In</h2>

    <div class="mb-2 form-floating">
      <input type="email" class="form-control" name="email" id="email" placeholder="name@example.com"value='<?php echo $email; ?>' required>
      <label for="emailLogin">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" name="password" id="login-password" placeholder="Password" value='<?php echo $password; ?>' required>
      <label for="passwordLogin">Password</label>
    </div>
    <div class="form-group text-center">
      <input type="checkbox" tabindex="3" class="" name="remember" id="remember">
      <label for="remember">Stay logged in</label>
    </div>
    <br></br>
    <?php
    show_msg();
    ?>
    <input type="submit" name="login-submit" id="login-submit" tabindex="4" class="btn btn-primary w-100 py-2" value="Sign in">
    <?php
    if (isset($forgot_password)) {
      echo '<a class="mt-1 btn btn-primary w-100 py-2" href="./reset_1.php" role="button">Forgot password?</a>';
    } else {
      echo '<a class="mt-1 btn btn-primary w-100 py-2" href="./register.php" role="button">Register</a>';
    }
    ?>
    <br></br>
    <p class="mt-5 mb-1 text-body-secondary">Please note that this is a paid service provided to CES customers.</p>
    <p class="mt-2 mb-1 text-body-secondary">To book a demo on get details around the product, please reach out to our office.</p>
    <p class="mt-5 mb-1 text-body-secondary">© Coreline Engineering Solutions (PTY) Ltd</p>
    <p class="mb-3 text-body-secondary"><a href="tel:+0000"></a> </p>
  </form>
</main>

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>    
<script src="./javascript/index.js"></script>
</body>
</html>
