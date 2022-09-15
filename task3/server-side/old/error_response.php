<?php
    header("Content-Type: application/json; charset=utf-8");
    header("Access-Control-Allow-Origin: *");

    $RESPONSES = [
        400 => "Bad Request",
        404 => "Not Found",
        405 => "Method Not Allowed",
        500 => "Internal server error"
    ];

    /**
     * 
     * 
     * @param int $code 
     * @param string $message 
     * @return void
     */
    function send_error($code, $message) {
        global $RESPONSES;

        $protocol = $_SERVER['SERVER_PROTOCOL'];
        header("$protocol $code - $RESPONSES[$code] : $message");

        $error = "$code - $RESPONSES[$code] : $message";
        echo json_encode(['error' => $error]);
        exit();
    }

    /**
     * 
     * 
     * @param int $code 
     * @param array $errors 
     * @return void
     */
    function send_parameter_error($code, $errors) {
        global $RESPONSES;
        
        $first = array_key_first($errors);
        $error = "$code - $RESPONSES[$code] : $errors[$first]";

        $protocol = $_SERVER['SERVER_PROTOCOL'];
        header("$protocol $code - $RESPONSES[$code] : $errors[$first]");

        echo json_encode(['error' => $error]);
        exit();
    }
?>