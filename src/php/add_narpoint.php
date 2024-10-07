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

    // inputs
    $address = $postData['ADDRESS'] ?? null;
    $user_name = $postData['USER_NAME'] ?? null;
    $point_data = $postData['POINT_DATA'] ?? null;
    $timestamp = $postData['TIMESTAMP'] ?? null;
    if (is_array($point_data)) {
        $point_data = json_encode($point_data);
    }
    $type = $postData['POINT_TYPE'] ?? 1;
    // types 1:Pole, 2:Anchor, 3:Other
    if ($type === '') {
        $type = 1;
    }
    $job_reference = $postData['JOB_REFERENCE'] ?? null; // This is the project value 
    $work_prints = $postData['WORK_PRINTS'] ?? null;
    $narrative_radius = $postData['NARRATIVE_RADIUS'] ?? null;
    if ($narrative_radius === '') {
        $narrative_radius = null;
    }
    $narrative_suffix = $postData['NARRATIVE_SUFFIX'] ?? null;



    // Validate input data
    if ($user_name && $point_data) {
        try {
            $sql = "INSERT INTO website.nar_point(
                address, username, point_as_text, active_session, type, job_reference, work_prints, 
                narrative_radius, narrative_suffix, timestamp)
                VALUES (:address, :username, :point_as_text, 'active', :type, :job_reference, :work_prints, 
                :narrative_radius, :narrative_suffix, :timestamp);";

            $stmt = $pdo->prepare($sql);

            // Bind parameters
            $stmt->bindParam(':address', $address);
            $stmt->bindParam(':username', $user_name);
            $stmt->bindParam(':point_as_text', $point_data);
            $stmt->bindParam(':type', $type, PDO::PARAM_INT);
            $stmt->bindParam(':job_reference', $job_reference);
            $stmt->bindParam(':work_prints', $work_prints);
            $stmt->bindParam(':narrative_radius', $narrative_radius, PDO::PARAM_INT);
            $stmt->bindParam(':narrative_suffix', $narrative_suffix);
            $stmt->bindParam(':timestamp', $timestamp);

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
