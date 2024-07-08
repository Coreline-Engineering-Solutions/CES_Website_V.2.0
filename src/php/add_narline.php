<?php

    include "connections.php";

    // Check if the request method is POST
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        // Retrieve POST data
        $user_name = $_POST['user_name'] ?? null;
        $line_data = $_POST['line_data'] ?? null;

        // Validate input data
        if ($user_name && $line_data) {
            try {
                // Prepare SQL statement
                $sql = "INSERT INTO website.nar_line (username, line_as_text) VALUES (:user_name, :line_data)";
                $stmt = $pdo->prepare($sql);

                // Bind parameters
                $stmt->bindParam(':user_name', $user_name);
                $stmt->bindParam(':line_data', $line_data);

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
