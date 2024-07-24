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

    // Check if the request method is POST
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        // Retrieve POST data

        // Get the raw POST data
        $rawData = file_get_contents('php://input');
        // Decode the JSON data
        $postData = json_decode($rawData, true);
        $result='';


        $user_name = $postData['user_name'] ?? null;
        $line_data = $postData['line_data'] ?? null;
        $option = $postData['options'] ?? 0;
        if ($option === '') {
            $option = 0;
        }
        $project = $postData['project'] ?? null;

        // Validate input data
        if ($user_name && $line_data) {
            try {
                        // Decode the line_data if it is a JSON string
                if (is_string($line_data)) {
                    $line_data = json_decode($line_data, true);
                }

                // Check if line_data is now an array
                if (is_array($line_data)) {
                    // Prepare SQL statement
                    $sql = "INSERT INTO website.nar_line (username, line_as_text, options, job_reference, active_session) VALUES (:user_name, :line_data, :option, :project, 'active')";
                    $stmt = $pdo->prepare($sql);
                }    

                foreach ($line_data as $line) {
                    // Assume the line['coordinates'] is already transformed into the desired format
                    $line_data_string = json_encode($line['coordinates']);
    
                    // Bind parameters
                    $stmt->bindParam(':user_name', $user_name);
                    $stmt->bindParam(':line_data', $line_data_string, PDO::PARAM_STR);
                    $stmt->bindParam(':option', $option, PDO::PARAM_INT);
                    $stmt->bindParam(':project', $project);
    
                    // Execute the statement
                    $stmt->execute();
                }

                // Success response
                echo '_S';
            } catch (PDOException $e) {
                // Handle SQL execution error
                echo 'Error: ' . $e->getMessage();
            }
        } else {
            echo '_F';
        }
    } else {
        echo '_F';
    }
?>
