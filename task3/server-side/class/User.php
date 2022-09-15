<?php

class User {

    private $username;
    private $fullName;
    private $dateOfBirth;
    private $email;
    private $errors;

    public function __construct() {
        $this->username = "";
        $this->fullName = "";
        $this->dateOfBirth = "";
        $this->email = "";
        $this->errors = array();
    }

    /**
     * Set a users username. If not valid, the error response array will be updated 
     * with the appropriate message.
     * @param string $username Users username to set
     * @param array $errors Error response to capture any errors
     * @return void
     */
    public function set_username($username) {
        $length = strlen($username);

        if ($length < 8 || $length > 20)
            $this->errors['username'] = "Username must be between 8 and 20 characters long.";
        else if (!preg_match('/[A-Z]/', $username))
            $this->errors['username'] = "Username must contain at least one upper case letter.";
        else if (!preg_match('/[~!@#$%^&*]/', $username))
            $this->errors['username'] = "Username must contain at least one special character (~!@#$%^&*).";
        else if (!preg_match('/[0-9]/', $username))
            $this->errors['username'] = "Username must contain at least one number.";
        else
            $this->username = $username;
    }

    /**
     * Set a users full name. If not valid, the error response array will be updated with 
     * the appropriate message. Must be more than one name and names must be separated by 
     * one white space.
     * @param string $fullName Users full name to set
     * @return void
     */
    public function set_full_name($fullName) {
        if (!preg_match('/^[-a-zA-Z\' ]+$/', $fullName))
            $this->errors['fullName'] = "Name can only contain letters, hyphens or apostrophes.";
        else if (!preg_match('/^[a-zA-Z\'-]*(?: [a-zA-Z\'-]+)+$/', $fullName)) // TODO
            $this->errors['fullName'] = "Invalid full name.";
        else
            $this->fullName = $fullName;
    }

    /**
     * Set a users date of birth. If not valid, the error response array will be updated
     * with the appropriate message.
     * @param string $dateOfBirth Users date of birth to Set
     * @return void
     */
    public function set_date_of_birth($dateOfBirth) {
        if (!preg_match('/^[0-3]?\d\/[0-1]?[0-2]\/[1-2]?(?:\d{3})$/', $dateOfBirth))
            $this->errors['dateOfBirth'] = "Invalid date of birth. Format: DD/MM/YYYY";
        else
            $this->dateOfBirth = $dateOfBirth;
    }

    /**
     * Set a users a users email. If not valid, the error response array will be updated
     * with the appropriate message.
     * @param string $email Users email address to set
     * @return void
     */
    public function set_email($email) {
        if (!preg_match('/^[a-zA-Z-]([\w\-.]+)?@([\w-]+\.)+[\w]+$/', $email))
            $this->errors['email'] = "Invalid email address.";
        else
            $this->email = $email;
    }

    public function is_error_empty() {
        return empty($this->errors);
    }

}

