<?php

    
    // CORS SOLVER
        // Allow from any origin
        header("Access-Control-Allow-Origin: *");

        // Allow specific HTTP methods
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    
        // Allow specific headers
        header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    
        // Handle preflight requests
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            http_response_code(200);
            exit;
        }
    

    include "connections.php";
    


    if ($_SERVER['REQUEST_METHOD']=="POST") {

      $rawData = file_get_contents('php://input');
      $_postData = json_decode($rawData, true);
      $result='';



      $uname = $_postData['username'];
      $email = $_postData['email'];
      $e_conf = $_postData['email_confirm'];
      $pword = $_postData['password'];
      $p_conf = $_postData['password_confirm'];

      $errors = [];

      if (strlen($uname)<3) {
        $errors[] = "Username name must be atleast 3 characters long";
      }
      if ($email != $e_conf) {
        $errors[] = "Email address is not correctly confirmed";
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
        $errors[] = "Password needs to be 8 Characters, contain numbers, symbols and Upper and Lower case letters";
      }
      if ($pword != $p_conf) {
        $errors[] = "Password is not correctly confirmed";
      }
      if (count_field_val($pdo, "users", "username", $uname) !=0) {
        $errors[] = "Username already exists";
      } 
      if (count_field_val($pdo, "users", "email", $email) !=0) {
        $errors[] = "Email already exists";
      }
      
      if (empty($errors)) {
        $vcode=generate_token();
        try{
          
          $sql = "INSERT INTO user_profiles.users( username, password, validationcode, email, joined) VALUES ( :username, :password, :validationcode, :email, current_date);";
          $stmnt = $pdo->prepare($sql);
          $user_data = [ ':username'=>$uname, ':password'=>password_hash($pword, PASSWORD_BCRYPT), ':validationcode'=>$vcode, ':email'=>$email];
          $stmnt->execute($user_data);

          $body = "<p>Please click on the link below to verify your email address</p><p><a href='www.corelineengineering.com/php/verify_mail.php?email={$email}&code={$vcode}'>Activate Account</a></p>";
          send_mail($email, "Activate User", $body, $from_email, $reply_email);
        } catch(PDOException $e) {
          echo "Error: ".$e->getMessage();
        }
      } else {
        foreach ($errors as $error) {
            echo $error . "<br>";
        }
      }

    } else {
      echo "invalid request";
    }

?>