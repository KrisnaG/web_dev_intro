<?php
    /**
     * File: Database.php
     * Author: Krisna Gusti
     * Description: Database class that holds users valid information.
     * Database can save user details to a JSON file. If an empty JSON
     * is created, it must contain [].
     */

    class Database implements JsonSerializable {

        // Class properties
        private $dbFile;
        private $username;
        private $fullName;
        private $dateOfBirth;
        private $email;

        // Constructor
        public function __construct() {
            $this->dbFile = "db.json";
            $this->username = "";
            $this->fullName = "";
            $this->dateOfBirth = "";
            $this->email = "";
        }

        /**
         * Set users details in database.
         * @param array $user Associative array of users details
         * @return bool true if sets user with valid keys, otherwise false
         */
        public function set_user(array $user) {
            if (isset($user["username"]) && isset($user["fullName"]) &&
                isset($user["dateOfBirth"]) && isset($user["email"])) {
                    $this->username = $user["username"];
                    $this->fullName = $user["fullName"];
                    $this->dateOfBirth = $user["dateOfBirth"];
                    $this->email = $user["email"];
                    return true;
            }      
            return false;
        }

        /**
         * Data to be serialized to JSON
         */
        public function jsonSerialize() {
            return [
                "username" => $this->username,
                "fullName" => $this->fullName,
                "dateOfBirth" => $this->dateOfBirth,
                "email" => $this->email
            ];
        }

        /**
         * Writes the contents of the user details as json to file given 
         * in the database.
         * 
         * @param Database $Database Database to save user to
         * @param json $user Users details as JSON
         * @return bool true if successfully saved to database, otherwise false
         */
        public static function save_user(Database $Database, $user) {
            // check database exists
            if ($Database) {
                // create json file it does not exist
                if (!file_exists($Database->dbFile))
                    file_put_contents($Database->dbFile, []);

                // extract file contents and append user details
                $db = json_decode(file_get_contents($Database->dbFile), true);
                $db[] = json_decode(strval($user), true);

                // write json to file
                if (file_put_contents($Database->dbFile, 
                    json_encode($db)) !== false)
                        return true;
            } 
            return false;       
        }
    }