<?php
    /**
     * File: Database.php
     * Author: Krisna Gusti
     * Description:
     */

    class Database implements JsonSerializable {

        // Class properties
        private $username;
        private $fullName;
        private $dateOfBirth;
        private $email;

        // Constructor
        public function __construct($results) {
            $this->username = $results['username'];
            $this->fullName = $results['fullName'];
            $this->dateOfBirth = $results['dateOfBirth'];
            $this->email = $results['email'];
        }


        /**
         * 
         */
        public function jsonSerialize() {
            return [
                'username' => $this->username,
                'fullName' => $this->fullName,
                'dateOfBirth' => $this->dateOfBirth,
                'email' => $this->email
            ];
        }
        
        /**
         * 
         * @param Database $Database 
         * @return bool 
         */
        public static function save_user(Database $Database) {
            if ($Database) {
                file_put_contents("db.json", json_encode($Database), FILE_APPEND);
                return true;
            } else {
                return false;
            }
                
        }
    }

