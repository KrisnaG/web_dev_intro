<?php

class Database implements JsonSerializable {
    
    private $username;
    private $fullName;
    private $dateOfBirth;
    private $email;

    public function __construct($username, $fullName, $dateOfBirth, $email) {
        $this->username = $username;
        $this->fullName = $fullName;
        $this->dateOfBirth = $dateOfBirth;
        $this->email = $email;
    }

    public function jsonSerialize() {
        return [
        	'username' => $this->username,
        	'fullName' => $this->fullName,
        	'dateOfBirth' => $this->dateOfBirth,
            'email' => $this->email
		];
    }
}

