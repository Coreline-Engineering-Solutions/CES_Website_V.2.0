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


        $user_name = $postData['_USERNAME'] ?? null;
        $project = $postData['_PROJECT'] ?? null;
        $description = $postData['_DESCRIPTION'] ?? null;

        // Validate input data
        if ($user_name && $project) {
            try {
                // Prepare SQL statement
                $sql = "INSERT INTO website.user_job_references (username, job_reference, job_description) VALUES (:user_name, :project, :description)";
                $stmt = $pdo->prepare($sql);

                // Bind parameters
                $stmt->bindParam(':user_name', $user_name);
                $stmt->bindParam(':project', $project);
                $stmt->bindParam(':description', $description);

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
