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
        // Get the raw POST data
        $rawData = file_get_contents('php://input');
        // Decode the JSON data
        $postData = json_decode($rawData, true);
        $result='';
        $uname = $postData['USERNAME'];
        $project = $postData['PROJECT'];

            try {
                // Prepare SQL statement
                $sql = "UPDATE website.nar_line SET active_session = 'inactive' WHERE username = :user_name and job_reference = :project ";
                $stmt = $pdo->prepare($sql);

                // Bind parameters
                $stmt->bindParam(':user_name', $uname);
                $stmt->bindParam(':project', $project);
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

    
?>