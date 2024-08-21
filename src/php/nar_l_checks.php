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


    // Normal form  for check on logon
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        // Get the raw POST data
        $rawData = file_get_contents('php://input');
        // Decode the JSON data
        $postData = json_decode($rawData, true);
        $result='';
        $uname = $postData['USERNAME'];
        $project = $postData['PROJECT'];

        try {
            $sql="SELECT line_as_text, hyperlink, narative, timestamp, line_name, options  FROM website.nar_line WHERE username=:value AND active_session = 'active' AND job_reference = :project ";
            $stmnt=$pdo->prepare($sql);
            $stmnt->execute([':value' => $uname, ':project' => $project]);
            $data = $stmnt->fetchAll(PDO::FETCH_ASSOC);
        
            // Return the data as JSON
            header('Content-Type: application/json');
            echo json_encode($data);
        } catch(PDOException $e) {
            header('Content-Type: application/json');
            echo json_encode(['error' => $e->getMessage()]);
        }
    } else {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Not a POST request']);
    }

?>
