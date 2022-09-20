<?php
    /**
     * File: ErrorResponse.php
     * Author: Krisna Gusti
     * Description: Error response class that holds error response
     * codes and can respond with custom error messages.
     */

    class ErrorResponse {
        
        // response codes and errors
        public static $RESPONSES = [
            400 => "Bad Request",
            404 => "Not Found",
            405 => "Method Not Allowed",
            500 => "Internal server error"
        ];

        /**
        * Generates a custom header and body response and exits.
        * 
        * @param int $code Code of error
        * @param string $message Message to append to error header and body
        * @return void
        */
        public static function send_error(int $code, string $message) {
            $protocol = $_SERVER["SERVER_PROTOCOL"];
            $response = self::$RESPONSES[$code];
            
            header("$protocol $code - $response : $message");
    
            $error = "$code - $response : $message";
            echo json_encode(["error" => $error]);
            exit;
        }
    }
?>