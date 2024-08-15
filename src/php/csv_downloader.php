<?php

// CORS Solver
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

include "connections.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the raw POST data
    $rawData = file_get_contents('php://input');
    // Decode the JSON data
    $postData = json_decode($rawData, true);
    $uname = $postData['USERNAME'];
    $project = $postData['PROJECT'];

    try {
        $sql = "SELECT line_as_text, hyperlink, narative FROM website.nar_line WHERE username=:value AND active_session = 'active' AND job_reference = :project";
        $stmnt = $pdo->prepare($sql);
        $stmnt->execute([':value' => $uname, ':project' => $project]);
        $data = $stmnt->fetchAll(PDO::FETCH_ASSOC);

        // Check if data is retrieved
        if ($data) {
            header('Content-Type: application/json');
            echo json_encode($data);
        } else {
            header('Content-Type: application/json');
            echo json_encode(['error' => 'No data found']);
        }
    } catch (PDOException $e) {
        header('Content-Type: application/json');
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Not a POST request']);
}

?>
