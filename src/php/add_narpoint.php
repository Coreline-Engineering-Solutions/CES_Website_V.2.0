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

    include "connections.php"

    // Check if the request method is POST
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        
        $rawData = file_get_contents('php://input');
        $postData = json_decode($rawData, true);
        $result='';

        $user_name = $postData['user_name'] ?? null;
        $point_data = $postData['point_data'] ?? null;

        // Validate input data
        if ($user_name && $point_data) {
            try {
                // Prepare SQL statement
                $sql = "INSERT INTO website.nar_point (username, point_as_text, active_session) VALUES (:user_name, :point_data, 'active')";
                $stmt = $pdo->prepare($sql);

                // Bind parameters
                $stmt->bindParam(':user_name', $user_name);
                $stmt->bindParam(':point_data', $point_data);

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
