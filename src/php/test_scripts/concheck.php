<?php

$host = 'geo.corelineengineering.com';
$port = 5432;

function test_connectivity($host, $port) {
    $connection = @fsockopen($host, $port, $errno, $errstr, 5);

    if ($connection) {
        fclose($connection);
        return "Successfully connected to $host on port $port.";
    } else {
        return "Failed to connect to $host on port $port. Error: $errstr ($errno)";
    }
}

echo test_connectivity($host, $port);
?>
