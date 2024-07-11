<?php

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
                    echo "Email has been verified. Please await administrator activation";
                    redirect('https://www.corelineengineering.com/');
                } catch(PDOException $e) {
                    return $e->getMessage();
                }

            } else {

                echo "Validation code does not match the datase - from_db'{$db_code}'='{$code}'from GET";
                redirect('https://www.corelineengineering.com/');
            }


        } else {
            echo "No validation code included with activate request";
            redirect('https://www.corelineengineering.com/');
        }
    } else {
        echo "No user included with activate request";
        redirect('https://www.corelineengineering.com/');
    }
?> 