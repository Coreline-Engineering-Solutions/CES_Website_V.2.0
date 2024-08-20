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

      if (count_field_val($pdo, "users", "email", $email) !=0) {
        
        $vcode=generate_token();
        try{
          
          $sql = "UPDATE user_profiles.users SET validationcode = :validationcode WHERE email = :email;";
          $stmnt = $pdo->prepare($sql);
          $user_data = [':validationcode'=>$vcode, ':email'=>$email];
          $stmnt->execute($user_data);

          $body = "<p>Please click on the link below to reset your password</p><p><a href='www.corelineengineering.com/PassReset?email={$email}&code={$vcode}'>Reset Password</a></p>";
          send_mail($email, "Reset Password", $body, $from_email, $reply_email);
          echo "_TRUE";
        } catch(PDOException $e) {
          echo "_FALSE";
        }
      } else {
        echo "_FALSE";
      }
    }
    
      
      
?>