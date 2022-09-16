<?php
    /**
     * File: validation.php
     * Author: Krisna Gusti
     * Description:
     */

    /**
     * Validates a POST request parameter is present. If present store
     * in results array, otherwise the error response array will be 
     * updated with the appropriate message.
     * 
     * @param string $param Parameter data to check
     * @param array $response Results to store present data
     * @param array $errors Error response to capture any errors
     * @param string $name Proper name of parameter
     * @return void
     */
    function validate_request_parameter($param, &$response, &$errors, $name) {
        $set = isset($_POST[$param]);

        if ($set && $_POST[$param] == "")
            $errors[$param] = "$name must not be empty.";
        else if ($set)
            $response[$param] = $_POST[$param];
        else 
            $errors[$param] = "$name must be provided.";
    }

    /**
     * Validates all users input data.
     * 
     * @param array $response Results of user data
     * @param array $errors Error response to capture any errors
     * @return void
     */
    function validate_user_data($response, &$errors) {
        validate_username($response['username'], $errors);
        validate_full_name($response['fullName'], $errors);
        validate_date_of_birth($response['dateOfBirth'], $errors);
        validate_email($response['email'], $errors);
    }

    /**
     * Validate a users username. If not valid, the error response array
     * will be updated with the appropriate message.
     * 
     * @param string $username Users username to validate
     * @param array $errors Error response to capture any errors
     * @return void
     */
    function validate_username($username, &$errors) {
        $length = strlen($username);

        if ($length < 8 || $length > 20)
            $errors['username'] = "Username must be between 8 and 20 characters long.";
        else if (!preg_match('/[A-Z]/', $username))
            $errors['username'] = "Username must contain at least one upper case letter.";
        else if (!preg_match('/[~!@#$%^&*]/', $username))
            $errors['username'] = "Username must contain at least one special character (~!@#$%^&*).";
        else if (!preg_match('/[0-9]/', $username))
            $errors['username'] = "Username must contain at least one number.";
    }

    /**
     * Validate a users full name. If not valid, the error response array
     * will be updated with the appropriate message. Must be more than one 
     * name and names must be separated by one white space.
     * 
     * @param string $fullName Users full name to validate
     * @param array $errors Error response to capture any errors
     * @return void
     */
    function validate_full_name($fullName, &$errors) {
        if (!preg_match('/^[-a-zA-Z\' ]+$/', $fullName))
            $errors['fullName'] = "Name can only contain letters, hyphens or apostrophes.";
        else if (!preg_match('/^[a-zA-Z\'-]*(?: [a-zA-Z\'-]+)+$/', $fullName))
            $errors['fullName'] = "Invalid full name.";
    }

    /**
     * Validate a users date of birth. If not valid, the error response array
     * will be updated with the appropriate message.
     * 
     * @param string $dateOfBirth Users date of birth to validate
     * @param array $errors Error response to capture any errors
     * @return void
     */
    function validate_date_of_birth($dateOfBirth, &$errors) {
        if (!preg_match('/^\d{2}\/\d{2}\/\d{4}$/', $dateOfBirth) ||
            !(bool)DateTime::createFromFormat("d/m/Y", $dateOfBirth))
            $errors['dateOfBirth'] = "Invalid date of birth. Format: DD/MM/YYYY";
    }

    /**
     * Validate a users a users email. If not valid, the error response array
     * will be updated with the appropriate message.
     * 
     * @param string $email Users email address to validate
     * @param array $errors Error response to capture any errors
     * @return void
     */
    function validate_email($email, &$errors) {
        if (!preg_match('/^[a-zA-Z-]([\w\-.]+)?@([\w-]+\.)+[\w]+$/', $email))
            $errors['email'] = "Invalid email address.";
    }