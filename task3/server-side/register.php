<?php
    /**
     * File: register.php
     * Author: Krisna Gusti
     * Description: Receives external POST data request to validate and 
     * register a user within a database. A JSON object is returned with 
     * the users temporary password.
     */

    // import required files
    require_once __DIR__ . "/class/Database.php";
    require_once __DIR__ . "/class/ErrorResponse.php";
    require_once __DIR__ . "/utility/validation.php";
    require_once __DIR__ . "/utility/password_gen.php";

    // set headers
    header("Content-Type: application/json; charset=utf-8");
    header("Access-Control-Allow-Origin: *");
    
    // User fields and proper descriptions
    $user_fields = [
        "username" => "Username", 
        "fullName" => "Full name", 
        "dateOfBirth" => "Date of birth", 
        "email" => "Email"
    ];
    
    // initial response arrays
    $errors = array();
    $user_response = array();

    // create database
    $database = new Database();
    
    // check POST only requests
    if ($_SERVER["REQUEST_METHOD"] !== "POST") 
        ErrorResponse::send_error(405, "Only POST requests allowed.");
    
    // validate received POST
    if (empty($_POST)) 
        ErrorResponse::send_error(404, "No POST data received.");       
 
    // validate POST fields
    foreach ($user_fields as $key => $value) 
        if (!validate_request_parameter($key, $user_response, $errors, $value))
            ErrorResponse::send_error(404, array_values($errors)[0]);
    
    // validate data
    if (!validate_user_data($user_response, $errors))
        ErrorResponse::send_error(400, array_values($errors)[0]);

    // set users details in database
    if (!$database->set_user($user_response))
        ErrorResponse::send_error(500, "Error with user properties in database.");

    // write users details to the database file
    if (!Database::save_user($database, json_encode($database)))
        ErrorResponse::send_error(500, "Error with database.");

    // generate and return temporary password
    echo json_encode(
        generate_temp_password(
            $user_response["username"], 
            $user_response["dateOfBirth"]
    ));
?>