<?php
    require_once __DIR__ . '/error_response.php';
    require_once __DIR__ . '/validation.php';

    $errors = array();
    $result = array();
    
    // check POST only requests
    if ($_SERVER["REQUEST_METHOD"] !== "POST") 
        send_error(405, "Only POST requests allowed.");
    
    // validate request
    if (!empty($_POST)) {
        validate_request_parameter('username', $result, $errors, "Username");
        validate_request_parameter('fullName', $result, $errors, "Full name");
        validate_request_parameter('dateOfBirth', $result, $errors, "Date of birth");
        validate_request_parameter('email', $result, $errors, "Email");
    } else {
        send_error(400, "No POST data received.");
    }

    // respond with any errors
    if (!empty($errors))
        send_parameter_error(400, $errors);

    // validate data
    validate_username($result['username'], $errors);
    validate_full_name($result['fullName'], $errors);
    validate_date_of_birth($result['dateOfBirth'], $errors);
    validate_email($result['email'], $errors);

    // respond with any errors
    if (!empty($errors))
        send_parameter_error(400, $errors);

    //
    echo json_encode($result);
?>