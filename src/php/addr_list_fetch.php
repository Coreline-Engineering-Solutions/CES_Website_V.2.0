<?php

// CORS SOLVER
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Read input data
    $inputData = json_decode(file_get_contents('php://input'), true);
    
    if (isset($inputData['LAT']) && isset($inputData['LON'])) {
        $latitude = $inputData['LAT'];
        $longitude = $inputData['LON'];
        
        // Construct the Google Geocoding API URL
        $googleApiUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng={$latitude},{$longitude}&key=AIzaSyDjBixCluMxpTyIbqp7mWs88Q2fnTuobYk";
        

        // Initialize cURL
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $googleApiUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
        // Execute the request
        $response = curl_exec($ch);
        
        // Check for cURL errors
        if (curl_errno($ch)) {
            curl_close($ch);
            echo json_encode(['status' => 'error', 'message' => 'Unable to contact Google API.']);
            exit;
        }

        // Close cURL session
        curl_close($ch);

        // Decode the response
        $responseData = json_decode($response, true);

        if ($responseData['status'] === 'OK' && !empty($responseData['results'])) {
            // Initialize an array to store the refined addresses
            $refinedAddresses = [];

            foreach ($responseData['results'] as $result) {
                // Only consider addresses where the location_type is 'ROOFTOP'
                if (isset($result['geometry']['location_type']) && $result['geometry']['location_type'] === 'ROOFTOP') {
                    // Get the formatted address
                    $formattedAddress = $result['formatted_address'];

                    // Split the address into segments by comma
                    $addressParts = explode(',', $formattedAddress);

                    // Ensure the address has more than 4 segments before processing
                    if (count($addressParts) >= 4) {
                        // Add the first segment (street address) to the refined list
                        $refinedAddresses[] = trim($addressParts[0]);
                    }
                }
            }

            // Return the refined addresses as a JSON list
            echo json_encode($refinedAddresses);
        } else {
            echo "_F";
            // echo json_encode(['status' => 'error', 'message' => 'No valid addresses found near the provided coordinates.']);
        }
    } else {
        echo "_F";
        // echo json_encode(['status' => 'error', 'message' => 'Invalid input. LAT and LON are required.']);
    }
}
