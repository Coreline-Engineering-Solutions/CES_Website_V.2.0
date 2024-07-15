<?php

    include "connections.php"

    // Check if the request method is POST
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        // Retrieve POST data
        $user_name = $_POST['user_name'] ?? null;
        $point_data = $_POST['point_data'] ?? null;

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
