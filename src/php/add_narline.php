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

        // Validate input data
        if ($user_name && $line_data) {
            try {
                // Prepare SQL statement
                $sql = "INSERT INTO website.nar_line (username, line_as_text, active_session) VALUES (:user_name, :line_data, 'active')";
                $stmt = $pdo->prepare($sql);

                // Bind parameters
                $stmt->bindParam(':user_name', $user_name);
                $stmt->bindParam(':line_data', $line_data);

                // Execute the statement
                $stmt->execute();

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
