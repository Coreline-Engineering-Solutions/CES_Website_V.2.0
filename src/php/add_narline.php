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
    $timestamp = $postData['TIMESTAMP'] ?? null;

    // Validate input data
    if ($user_name && $line_data) {
        try {
            // Check if line_data is now an array
            if (is_array($line_data)) {
                // Prepare SQL statement
                $sql = "INSERT INTO website.nar_line (username, line_as_text, options, job_reference, timestamp, active_session) VALUES (:user_name, :line_data, :option, :project, :timestamp, 'active')";
                $stmt = $pdo->prepare($sql);

                // Convert the line_data array to JSON string
                $line_data_string = json_encode($line_data);

                // Bind parameters
                $stmt->bindParam(':user_name', $user_name);
                $stmt->bindParam(':line_data', $line_data_string, PDO::PARAM_STR);
                $stmt->bindParam(':option', $option, PDO::PARAM_INT);
                $stmt->bindParam(':project', $project);
                $stmt->bindParam(':timestamp', $timestamp);

                // Execute the statement
                $stmt->execute();

                // Success response
                echo '_S';
            } else {
                echo '_F';
            }
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
