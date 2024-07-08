<?php

    include "connections.php";



    if ($_SERVER['REQUEST_METHOD']=="POST") {
      $uname = $_POST['username'];
      $email = $_POST['email'];
      $e_conf = $_POST['email_confirm'];
      $pword = $_POST['password'];
      $p_conf = $_POST['password_confirm'];

      if (strlen($uname)<3) {
        $error[] = "Username name must be atleast 3 characters long";
      }
      if ($email != $e_conf) {
        $error[] = "Email address is not correctly confirmed";
      }
      if (
        preg_match('/[a-z]/', $pword) &&
        preg_match('/[A-Z]/', $pword) &&
        preg_match('/[0-9]/', $pword) &&
        preg_match('/[^a-zA-Z0-9]/', $pword) &&
        strlen($pword) >= 8
      ) {
        // Empty code block
      } else {
        $error[] = "Password needs to be 8 Characters, contain numbers, symbols and Upper and Lower case letters";
      }
      if ($pword != $p_conf) {
        $error[] = "Password is not correctly confirmed";
      }
      if (count_field_val($pdo, "users", "username", $uname) !=0) {
        $error[] = "Username already exists";
      } 
      if (count_field_val($pdo, "users", "email", $email) !=0) {
        $error[] = "Email already exists";
      }
      
      if (!isset($error)) {
        $vcode=generate_token();
        try{
          $sql = "INSERT INTO user_profiles.users( username, password, validationcode, email, joined) VALUES ( :username, :password, :validationcode, :email, current_date);";
          $stmnt = $pdo->prepare($sql);
          $user_data = [ ':username'=>$uname, ':password'=>password_hash($pword, PASSWORD_BCRYPT), ':validationcode'=>$vcode, ':email'=>$email];
          $stmnt->execute($user_data);

          $body = "<p>Please click on the link below to verify your email address</p><p><a href='activate.php?email={$email}&code={$vcode}'>Activate Account</a></p>";
          send_mail($email, "Activate User", $body, $from_email, $reply_email);
        } catch(PDOException $e) {
          echo "Error: ".$e->getMessage();
        }
      }

    } else {
      echo ="invalid request";
      

    }
?>