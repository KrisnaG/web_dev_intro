<?php
    /**
     * File: validation.php
     * Author: Krisna Gusti
     * Description: Validation class that holds validation errors
     * and validates all users requests and data.
     */

    class Validator {
        // User fields and proper descriptions
        public static $user_fields = [
            "username" => "Username", 
            "fullName" => "Full name", 
            "dateOfBirth" => "Date of birth", 
            "email" => "Email"
        ];
        private $errors;

        // Constructor
        public function __construct() {
            $this->errors = array();
        }

        /**
         * Gets and returns the first error in the error array.
         * 
         * @return bool first error
         */
        public function get_first_error() {
            return array_values($this->errors)[0];
        }

        /**
         * Validates a POST request parameter is present. Any errors 
         * will be updated and stored with the appropriate message.
         * 
         * @param string $param Parameter data to check
         * @return bool User data is valid, otherwise false
         */
        public function validate_request_parameter($param) {
            $set = isset($_POST[$param]);
            $field = self::$user_fields[$param];

            if ($set && !$_POST[$param] == "")
                return $_POST[$param];
            else if ($set)
                $this->errors[$param] = "$field must not be empty.";
            else 
                $this->errors[$param] = "$field must be provided.";

            return false;
        }

        /**
         * Validates all users input data.
         * 
         * @param array $user_data Results of user data
         * @return bool true if all data is valid, otherwise false
         */
        public function validate_user_data($user_data) {
            if ($this->validate_username($user_data["username"]) &&
                $this->validate_full_name($user_data["fullName"]) &&
                $this->validate_date_of_birth($user_data["dateOfBirth"]) &&
                $this->validate_email($user_data["email"]))
                    return true;
            else
                return false;
        }

        /**
         * Validate a users username. Any errors will be updated and 
         * stored with the appropriate message.
         * 
         * @param string $username Users username to validate
         * @return bool true if no errors, otherwise false
         */
        public function validate_username($username) {
            $length = strlen($username);

            if ($length < 8 || $length > 20)
                $this->errors["username"] = "Username must be between 8 and 20 characters long.";
            else if (!preg_match("/[A-Z]/", $username))
                $this->errors["username"] = "Username must contain at least one upper case letter.";
            else if (!preg_match("/[~!@#$%^&*]/", $username))
                $this->errors["username"] = "Username must contain at least one special character (~!@#$%^&*).";
            else if (!preg_match("/[0-9]/", $username))
                $this->errors["username"] = "Username must contain at least one number.";
            else
                return true;

            return false;
        }

        /**
         * Validate a users full name. Any errors will be updated and 
         * stored with the appropriate message. Must be more than one 
         * name and names must be separated by one white space.
         * 
         * @param string $fullName Users full name to validate
         * @return bool true if no errors, otherwise false
         */
        public function validate_full_name($fullName) {
            if (!preg_match("/^[-a-zA-Z\" ]+$/", $fullName))
                $this->errors["fullName"] = "Name can only contain letters, hyphens or apostrophes.";
            else if (!preg_match("/^[a-zA-Z\"-]*(?: [a-zA-Z\"-]+)+$/", $fullName))
                $this->errors["fullName"] = "Invalid full name. Minimum requirement first and last name.";
            else
                return true;

            return false;
        }

        /**
         * Validate a users date of birth. Any errors will be updated and 
         * stored with the appropriate message.
         * 
         * @param string $dateOfBirth Users date of birth to validate
         * @return bool true if no errors, otherwise false
         */
        public function validate_date_of_birth($dateOfBirth) {
            if (!preg_match("/^(\d{2})\/(\d{2})\/(\d{4})$/", $dateOfBirth, $piece))
                $this->errors["dateOfBirth"] = "Invalid date of birth. Format: DD/MM/YYYY";
            else if (!checkdate($piece[2], $piece[1], $piece[3]))
                $this->errors["dateOfBirth"] = "Invalid date in date of birth. Must be a valid date, i.e.,
                                        month not greater than 12.";
            else
                return true;
                        
            return false;
        }

        /**
         * Validate a users a users email. Any errors will be updated and 
         * stored with the appropriate message.
         * 
         * @param string $email Users email address to validate
         * @return bool true if no errors, otherwise false
         */
        public function validate_email($email) {
            if (!preg_match("/^[a-zA-Z-]([\w\-.]+)?@([\w-]+\.)+[\w]+$/", $email))
                $this->errors["email"] = "Invalid email address. Format: id@domain.ext";
            else
                return true;

            return false;
        }
    }