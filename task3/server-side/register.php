<?php
    /**
     * File: register.php
     * Author: Krisna Gusti
     * Description: Receives external POST data request to validate and 
     * register a user within a database. A JSON object is returned with 
     * the users temporary password.
     */

    // import required files
    spl_autoload_register(function($class_name) { 
        require_once __DIR__ . "/class/" . $class_name . ".php"; 
    });

    // set headers
    header("Content-Type: application/json; charset=utf-8");
    header("Access-Control-Allow-Origin: *");
    
    $user_data = array();           // hold user data
    $database = new Database();     // create database
    $validation = new Validator();  // user validation
    
    // check POST only requests
    if ($_SERVER["REQUEST_METHOD"] !== "POST") 
        ErrorResponse::send_error(405, "Only POST requests allowed.");
    
    // check if received any POST data
    if (empty($_POST)) 
        ErrorResponse::send_error(404, "No POST data received.");       
 
    // validate POST fields present and not empty
    foreach (Validator::$user_fields as $key => $val) 
        if (($user_data[$key] = $validation->validate_request_parameter($key)) === false)
            ErrorResponse::send_error(404, $validation->get_first_error());
    
    // validate user data
    if (!$validation->validate_user_data($user_data))
        ErrorResponse::send_error(400, $validation->get_first_error());

    // set users details in database
    if (!$database->set_user($user_data))
        ErrorResponse::send_error(500, "Error with user properties in database.");

    // write users details to the database file
    if (!Database::save_user($database, json_encode($database)))
        ErrorResponse::send_error(500, "Error with database.");

    // generate and return temporary password
    echo json_encode(
        PasswordGen::generate_temp_password(
            $user_data["username"], 
            $user_data["dateOfBirth"]
    ));
?>