<?php
    /**
     * File: register.php
     * Author: Krisna Gusti
     * Description:
     */

    // import required files
    require_once __DIR__ . "/class/Database.php";
    require_once __DIR__ . "/utility/error_response.php";
    require_once __DIR__ . "/utility/validation.php";
    require_once __DIR__ . "/utility/password_gen.php";

    // set headers
    header("Content-Type: application/json; charset=utf-8");
    header("Access-Control-Allow-Origin: *");

    // response codes
    $RESPONSES = [
        400 => "Bad Request",
        404 => "Not Found",
        405 => "Method Not Allowed",
        500 => "Internal server error"
    ];
    
    // User fields and proper descriptions
    $user_fields = [
        "username" => "Username", 
        "fullName" => "Full name", 
        "dateOfBirth" => "Date of birth", 
        "email" => "Email"
    ];
    
    // initial response arrays
    $errors = array();
    $response = array();
    
    // check POST only requests
    if ($_SERVER["REQUEST_METHOD"] !== "POST") 
        send_error(405, $RESPONSES, "Only POST requests allowed.");
    
    // validate request
    if (!empty($_POST)) 
        foreach ($user_fields as $key => $value)
            validate_request_parameter($key, $response, $errors, $value);
    else 
        send_error(404, $RESPONSES, "No POST data received.");

    // respond with any errors
    if (!empty($errors))
        send_parameter_error(404, $RESPONSES, $errors);

    // validate data
    validate_user_data($response, $errors);

    // respond with any errors
    if (!empty($errors))
        send_parameter_error(400, $RESPONSES, $errors);

    // generate and return temporary password
    echo json_encode(
        generate_temp_password(
            $response['username'], 
            $response['dateOfBirth']
    ));
    
    // create database with user detail properties
    $Database = new Database($response);
    
    // write users details to the database file
    if (!Database::save_user($Database))
        send_error(500, $RESPONSES, "Database does not exist.");
?>