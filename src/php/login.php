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
    

    
    
        // // Normal form  for check on logon
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            // Get the raw POST data
            $rawData = file_get_contents('php://input');
            // Decode the JSON data
            $postData = json_decode($rawData, true);
            $result='';
            $email = $postData['email'];
            $password = $postData['password'];
            $remember = $postData['remember'];
    
            if (count_field_val($pdo, "users", "email", $email) > 0) {
                $user_data = return_user_field_data($pdo, "email", $email);
                if ($user_data['active'] == 1) {
                    if (password_verify($password, $user_data['password'])) {
                        echo 'password right';
                        session_start();
                        $_SESSION['username'] = $user_data['username'];
                        if ($remember == 'on') {
                            // time is time+seconds to give exp time, currently 8hrs
                            setcookie("username", $user_data['username'], time() + 28800);
                            $cookie_exp = true;
                        } else {
                            $cookie_exp = false;
                        }
                        $username = $_SESSION['username'];
                        $last_page = isset($_SERVER['SCRIPT_NAME']) ? $_SERVER['SCRIPT_NAME'] : (isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '');
                        $user_ip = $_SERVER['REMOTE_ADDR'];
                        $user_host = isset($_SERVER['REMOTE_HOST']) ? $_SERVER['REMOTE_HOST'] : '';
                        $user_port = $_SERVER['REMOTE_PORT'];
                        user_login_session_start($pdo, $username, $cookie_exp, $last_page, $user_ip, $user_host, $user_port);
                        // temporary place for update since we know db must be active at this stage, might automate/timed script in the future
                        transfer_logs($pdo);
                        echo json_encode(['result' => "_TRUE", 'username' =>$user_data['username']]);
          
                    } else {
                        echo 'password wrong';
                        echo json_encode(['result' => "FALSE"]);
                    }
                } else {
                    echo json_encode(['result' => "FALSE"]);
                }
            } else {
                echo json_encode(['result' => "FALSE"]);
            }
        } else {
            echo json_encode(['result' => "FALSE"]);
        }
    ?>