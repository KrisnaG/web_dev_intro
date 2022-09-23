<?php
    /**
     * File: password_gen.php
     * Author: Krisna Gusti
     * Description: Password generator class
     */
    
    class PasswordGen {
        /**
         * Generates a temporary password by randomising the users username
         * and appending the users age in years.
         * 
         * @param string $username Users username
         * @param string $dateOfBirth Users date of birth
         * @return object temporary password
         */
        public static function generate_temp_password($username, $dateOfBirth) {
            // set dates
            $today = date("d-m-Y");
            $dob = str_replace('/', '-', $dateOfBirth);
    
            // find the difference in dates
            $age = date_diff(
                date_create($dob),
                date_create($today)
            );
            
            // mix up username and append age 
            $tmp_pass = str_shuffle($username) . $age->y;
            
            return ["password" => $tmp_pass];
        }
    }
    