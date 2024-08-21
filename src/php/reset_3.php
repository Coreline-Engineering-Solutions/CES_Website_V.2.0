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




      $email = $_postData['email'];
      $pword = $_postData['password'];
      $p_conf = $_postData['password_confirm'];

      $errors = [];
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

      
      if (empty($errors)) {
        $vcode=generate_token();
        try{
          
          $sql = "UPDATE user_profiles.users SET validationcode = :validationcode, password = :password WHERE email = :email;";
          $stmnt = $pdo->prepare($sql);
          $user_data = [':validationcode'=>$vcode, ':password'=>password_hash($pword, PASSWORD_BCRYPT), ':email'=>$email];
          $stmnt->execute($user_data);
          echo "_TRUE";

          
        } catch(PDOException $e) {
          echo "_FALSE";
          echo "Error: ".$e->getMessage();
        }
      } else {
        echo "_FALSE";
        foreach ($errors as $error) {
            echo $error . "<br>";
        }
      }

    } else {
        echo "_FALSE";
    }

?>