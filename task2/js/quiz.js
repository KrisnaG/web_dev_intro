/**
 * 
 */

// Window onLoad listener
$(function() {
    //
    get_question_list();
    update_results();
    
    //
    $('#quiz').submit(
        function(e) {
            e.preventDefault();
            var selected = $('form input[name=answer]:checked').val();
            get_answer(question_id, selected);
        }
    );
});

var question_id = 0;
var attempted = 0;
var correct = 0;
var incorrect = 0;

function get_question_list() {
    $.ajax({
        url: 'http://turing.une.edu.au/~jbisho23/assignment2/quiz.php',
        method: 'GET',
        success: function(data) {
            var length = data['questions'].length;
            var id = Math.floor(Math.random() * (length - 1));
            question_id = data['questions'][id];
            get_response_info(question_id);
        },
        error: function(jqXHR) {
            print_request_error(jqXHR);
        }
    });
}

function get_response_info(question_id) {
    $.ajax({
        url: 'http://turing.une.edu.au/~jbisho23/assignment2/quiz.php',
        method: 'GET',
        data: {
            'q': question_id
        },
        dataType: 'json',
        success: function(data) {
            update_quiz(data);
        },
        error: function(jqXHR) {
            print_request_error(jqXHR);
        }
    });
}

function get_answer(question_id, answer) {
    $.ajax({
        url: 'http://turing.une.edu.au/~jbisho23/assignment2/quiz.php',
        method: 'GET',
        data: {
            'q': question_id, 
            'a': answer
        },
        dataType: 'json',
        success: function(data) {
            var result = data['correct'];
            attempted++;
            (result) ? correct++ : incorrect++;
            update_results();

        },
        error: function(jqXHR) {
            print_request_error(jqXHR);
        }
    });
}

function print_request_error(jqXHR) {
    var $error = JSON.parse(jqXHR.responseText);
    console.log('Status code: ' + $error.error);
    console.log('Error message: ' + $error.message);
}

function update_quiz(data) {
    $('#quiz_question').html(data['text']);
    $("form label[for='answer_a']").html(data['choices']['A']);
    $("form label[for='answer_b']").html(data['choices']['B']);
    $("form label[for='answer_c']").html(data['choices']['C']);
    $("form label[for='answer_d']").html(data['choices']['D']);
}

function update_results() {
    $('#attempted').html("Attempted: " + attempted);
    $('#correct').html("Correct: " + correct);
    $('#incorrect').html("Incorrect: " + incorrect);
}