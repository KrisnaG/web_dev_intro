/**
 * 
 */

// Window onLoad actions and listeners
$(function() {
    // initial quiz setup
    getQuestionList();
    updateResults();
    
    // submit button listener
    $("#quiz").submit(
        function(e) {
            e.preventDefault();
            var selected = $("form input[name=answer]:checked").val();
            if (selected)
                getAnswer(questionId, selected);
        }
    );

    // next button listener
    $("#quiz button[value=Next]").click(function () {
        nextQuiz();
    })
});

// Global variables
var questionId = 0;         // question id
var checkedId;              // answer input id
var attempted = 0;          // 
var correct = 0;            // 
var incorrect = 0;          // 

function generateQuestionID(data) {
    var length = data["questions"].length;
    var id = Math.floor(Math.random() * (length - 1));
    console.log("new: " + data["questions"][id]);
    console.log("current: " + questionId);
    if (data["questions"][id] === questionId) 
        generateQuestionID();
    else 
        return data["questions"][id];
}

/**
 * 
 */
function getQuestionList() {
    $.ajax({
        url: "http://turing.une.edu.au/~jbisho23/assignment2/quiz.php",
        method: "GET",
        success: function(data) {
            questionId = generateQuestionID(data);
            getQuestionDetails(questionId);
        },
        error: function(jqXHR) {
            printRequestError(jqXHR);
        }
    });
}

/**
 * 
 * @param questionId 
 */
function getQuestionDetails(questionId) {
    $.ajax({
        url: "http://turing.une.edu.au/~jbisho23/assignment2/quiz.php",
        method: "GET",
        data: {
            "q": questionId
        },
        dataType: "json",
        success: function(data) {
            updateQuiz(data);
        },
        error: function(jqXHR) {
            printRequestError(jqXHR);
        }
    });
}

/**
 * 
 * @param {*} questionId 
 * @param {*} answer 
 */
function getAnswer(questionId, answer) {
    $.ajax({
        url: "http://turing.une.edu.au/~jbisho23/assignment2/quiz.php",
        method: "GET",
        data: {
            "q": questionId, 
            "a": answer
        },
        dataType: "json",
        success: function(data) {
            handle_result(data);
        },
        error: function(jqXHR) {
            printRequestError(jqXHR);
        }
    });
}

/**
 * 
 * @param {*} jqXHR 
 */
function printRequestError(jqXHR) {
    var $error = JSON.parse(jqXHR.responseText);
    console.log("Status code: " + $error.error);
    console.log("Error message: " + $error.message);
}

/**
 * 
 * @param {*} data 
 */
function updateQuiz(data) {
    $("#quiz_question").html(data["text"]);
    $("form label[for='answer_a']").html(data["choices"]["A"]);
    $("form label[for='answer_b']").html(data["choices"]["B"]);
    $("form label[for='answer_c']").html(data["choices"]["C"]);
    $("form label[for='answer_d']").html(data["choices"]["D"]);
}

/**
 * 
 */
function updateResults() {
    $("#attempted").html("Attempted: " + attempted);
    $("#correct").html("Correct: " + correct);
    $("#incorrect").html("Incorrect: " + incorrect);
}

/**
 * 
 * @param {*} data 
 */
function handle_result(data) {
    var result = data["correct"];
    checkedId = $("form input[name=answer]:checked")[0]["id"];
    
    // increment attempt
    attempted++;
    
    // disable selection of radio buttons
    $(".info_box input").attr("disabled", true);
        
    // colour the selected answer
    if (result) {
        $("#" + checkedId).parent().css({"background-color": "#CCFFCD"});
        correct++
    } else {
        $("#" + checkedId).parent().css({"background-color": "#FFCCCB"});
        incorrect++;
    }

    // hide submit button and show next button
    $("#quiz input[value=Submit]").addClass("hidden");
    $("#quiz button[value=Next]").removeClass("hidden").addClass("button");
    
    // display new results
    updateResults();
}

/**
 * 
 */
function nextQuiz() {
    getQuestionList();

    $(".info_box input").attr("disabled", false);

    $("#" + checkedId)
        .prop("checked", false)
        .parent().css({"background-color": "#f5f5f5f5"});

    $("#quiz button[value=Next]").addClass("hidden");
    $("#quiz input[value=Submit]").removeClass("hidden").addClass("button");
}