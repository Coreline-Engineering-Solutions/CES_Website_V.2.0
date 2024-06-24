<?php
// Database configuration
// Temp measure for now
// ************* For PoSTGRES
$user = 'postgres';
$pass = 'IPX4_ce_UK_CA';
$dsn = "pgsql:host=172.16.58.11;dbname=corgis_users;port=5432";


$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    // Create a new PDO instance
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    // Handle connection error
    die('Connection failed: ' . $e->getMessage());
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve POST data
    $user_name = $_POST['user_name'] ?? null;
    $point_data = $_POST['point_data'] ?? null;

    // Validate input data
    if ($user_name && $point_data) {
        try {
            // Prepare SQL statement
            $sql = "INSERT INTO website.nar_point (username, point_as_text) VALUES (:user_name, :point_data)";
            $stmt = $pdo->prepare($sql);

            // Bind parameters
            $stmt->bindParam(':user_name', $user_name);
            $stmt->bindParam(':point_data', $point_data);

            // Execute the statement
            $stmt->execute();

            // Success response
            echo 'Data inserted successfully.';
        } catch (PDOException $e) {
            // Handle SQL execution error
            echo 'Error: ' . $e->getMessage();
        }
    } else {
        echo 'Invalid input data.';
    }
} else {
    echo 'Invalid request method.';
}
?>
