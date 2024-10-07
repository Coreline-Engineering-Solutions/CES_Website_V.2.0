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
    $user_name = $postData['USER_NAME'] ?? null;
    $line_data = $postData['LINE_DATA'] ?? null;
    // $user_name = $postData['user_name'] ?? null;
    // $line_data = $postData['line_data'] ?? null;
    $option = $postData['LOCATE_TYPE'] ?? 0;
    if ($option === '') {
        $option = 0;
    }
    $project = $postData['PROJECT'] ?? null;
    // $project = $postData['project'] ?? null;
    $timestamp = $postData['TIMESTAMP'] ?? null;
    $line_name = $postData['LINE_NAME'] ?? null;
    $line_max_length = $postData['LINE_LENGTH'] ?? null;
    if ($line_max_length === '') {
        $line_max_length = null;
    }
    // new options place holders
    $workprints = $postData['WORK_PRINTS'] ?? null;
    $not_distance_from_start = $postData['NOTE_DISTANCE_FROM_START_INTERSECTION'] ?? 0;
    $note_distance_from_end = $postData['NOTE_DISTANCE_FROM_END_INTERSECTION'] ?? 0;
    $note_address_at_start = $postData['NOTE_ADDRESS_AT_START'] ?? 0;
    $note_addresss_at_end = $postData['NOTE_ADDRESS_AT_END'] ?? 0;
    $gps_at_start = $postData['INCLUDE_GPS_AT_START'] ?? 0;
    $gps_at_end = $postData['INCLUDE_GPS_AT_END'] ?? 0;
    $gps_at_bearing = $postData['INCLUDE_GPS_AT_BEARING'] ?? 0;
    $split_on_max = $postData['SPLIT_ON_MAX_LENGTH'] ?? 0;






    // Validate input data
    if ($user_name && $line_data) {
        try {
            // Check if line_data is now an array
            if (is_array($line_data)) {
                // Prepare SQL statement
                // $sql = "INSERT INTO website.nar_line (username, line_as_text, options, job_reference, timestamp, line_name, max_length, 
                // active_session) VALUES (:user_name, :line_data, :option, :project, :timestamp, :line_name, 
                // :max_length, 'active')";

                $sql = "INSERT INTO website.nar_line (
                    username, line_as_text, options, job_reference, timestamp, line_name, max_length, active_session,
                    work_prints, note_distance_from_start_intersection, note_distance_from_end_intersection, note_address_at_start, note_address_at_end,
                    include_gps_at_start, include_gps_at_end, include_gps_at_bearing, split_on_max_length  
                    ) VALUES (
                        :user_name, :line_data, :option, :project, :timestamp, :line_name, :max_length, 'active', 
                        :work_prints, :note_distance_from_start_intersection, :note_distance_from_end_intersection, :note_address_at_start, :note_address_at_end,
                        :include_gps_at_start, :include_gps_at_end, :include_gps_at_bearing, :split_on_max_length 
                        )";
                $stmt = $pdo->prepare($sql);

                // Convert the line_data array to JSON string
                $line_data_string = json_encode($line_data);

                // Bind parameters
                $stmt->bindParam(':user_name', $user_name);
                $stmt->bindParam(':line_data', $line_data_string, PDO::PARAM_STR);
                $stmt->bindParam(':option', $option, PDO::PARAM_INT);
                $stmt->bindParam(':project', $project);
                $stmt->bindParam(':timestamp', $timestamp);
                $stmt->bindParam(':line_name', $line_name);
                $stmt->bindParam(':max_length', $line_max_length, PDO::PARAM_INT);
                $stmt->bindParam(':work_prints', $workprints);
                $stmt->bindParam(':note_distance_from_start_intersection', $not_distance_from_start, PDO::PARAM_BOOL);
                $stmt->bindParam(':note_distance_from_end_intersection', $note_distance_from_end, PDO::PARAM_BOOL); 
                $stmt->bindParam(':note_address_at_start', $note_address_at_start, PDO::PARAM_BOOL);
                $stmt->bindParam(':note_address_at_end', $note_addresss_at_end, PDO::PARAM_BOOL);
                $stmt->bindParam(':include_gps_at_start', $gps_at_start, PDO::PARAM_BOOL);
                $stmt->bindParam(':include_gps_at_end', $gps_at_end, PDO::PARAM_BOOL);
                $stmt->bindParam(':include_gps_at_bearing', $gps_at_bearing, PDO::PARAM_BOOL);
                $stmt->bindParam(':split_on_max_length', $split_on_max, PDO::PARAM_BOOL);

                // Execute the statement
                $stmt->execute();

                // Success response
                echo '_S';
            } else {
                echo '_F, cause empty line data array';
            }
        } catch (PDOException $e) {
            // Handle SQL execution error
            echo 'Error: ' . $e->getMessage();
        }
    } else {
        echo '_F, username or line data missing';
        echo 'username';
        echo $user_name;
        echo 'line data';
        echo $line_data;
    }
} else {
    echo '_F, request is not a post';
}
?>
