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

    if (isset($_GET['email'])) {
        $email = $_GET['email'];
        if (isset($_GET['code'])) {
            $code = $_GET['code'];
            $db_code = get_validationcode($email, $pdo);
            if ($code == $db_code) {
                try {
                    $sql="UPDATE user_profiles.users SET email_validated=1 WHERE email=:email";
                    $stmnt=$pdo->prepare($sql);
                    $stmnt->execute([':email'=>$email]);
                    echo "_TRUE";
                    
                } catch(PDOException $e) {
                    echo "_FALSE";
                    return $e->getMessage();
                }

            } else {

                echo "_FALSE";

            }


        } else {
            echo "_FALSE";
            
        }
    } else {
        echo "_FALSE";
        
    }
?> 