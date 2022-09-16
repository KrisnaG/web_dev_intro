<?php
    /**
     * File: error_response.php
     * Author: Krisna Gusti
     * Description:
     */

    /**
     * 
     * 
     * @param int $CODE 
     * @param int $RESPONSES
     * @param string $message 
     * @return void
     */
    function send_error($CODE, $RESPONSES, $message) {
        $protocol = $_SERVER['SERVER_PROTOCOL'];
        header("$protocol $CODE - $RESPONSES[$CODE] : $message");

        $error = "$CODE - $RESPONSES[$CODE] : $message";
        echo json_encode(['error' => $error]);
        exit();
    }

    /**
     * 
     * 
     * @param int $CODE 
     * @param int $RESPONSES
     * @param array $errors 
     * @return void
     */
    function send_parameter_error($CODE, $RESPONSES, $errors) {
        $first = array_key_first($errors);
        $error = "$CODE - $RESPONSES[$CODE] : $errors[$first]";

        $protocol = $_SERVER['SERVER_PROTOCOL'];
        header("$protocol $CODE - $RESPONSES[$CODE] : $errors[$first]");

        echo json_encode(['error' => $error]);
        exit();
    }
?>