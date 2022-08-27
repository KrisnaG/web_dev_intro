/**
 * quiz.js
 * @author Krisna Gusti
 * @brief Ajax quiz service. Handles all quiz related interaction.
 * Makes requests to the server for quiz information and displays 
 * it to the user. Once the user submits a response for a question,
 * a request it made to the sever for the result. The result is then
 * displayed to the user. 1the quiz service is run indefinitely.
 */

// Window onLoad listeners
$(function() {
    // submit button listener
    $("#quiz").submit(
        function(e) {
            e.preventDefault();
            window.clearErrors();
            var selected = $("form input[name=answer]:checked").val();

            // check if a response is selected
            if (selected)
                getAnswer(questionId, selected);
            else
                window.addError("Please Select an answer");
        }
        );
        
    // next button listener
    $("#quiz button[value=Next]").click(function () {
        nextQuiz();
    })
});
    
// Global variables
var checkedId;                  // answer input id
var questionId;                 // question id
var attempted;                  // total number of questions attempted
var correct;                    // total number of questions correct
var incorrect;                  // total number of questions incorrect'

/**
 * Print out the JSON error response from the request
 * @param jqXHR 
 */
 function printRequestError(jqXHR) {
    var $error = JSON.parse(jqXHR.responseText);
    console.log("Status code: " + $error.error);
    console.log("Error message: " + $error.message);
}

/**
 * Makes a GET request to the quiz server with the given question ID 
 * and answer and returns the results
 * @param question Question ID (optional) 
 * @param answer User selected answer (optional)
 * @returns Results of the quiz request
 */
async function makeQuizRequest(question = null, answer = null) {
    var input = {};
    var url = "http://turing.une.edu.au/~jbisho23/assignment2/quiz.php";
    
    // prefill question and answer if given
    if (question) input['q'] = question;
    if (answer) input['a'] = answer;

    // get and wait for quiz request
    var result = await $.ajax({
        url: url,
        method: "GET",
        data: input
    }).catch(err => {
        printRequestError(err)
    });

    return result;
}

/**
 * Update user results on sidebar
 */
 function updateResults() {
    $("#attempted").html("Attempted: " + attempted);
    $("#correct").html("Correct: " + correct);
    $("#incorrect").html("Incorrect: " + incorrect);
}

/**
 * Update quiz questions and response answers
 * @param data Question information
 */
 function updateQuiz(data) {
    $("#quiz_question").html(data["text"]);
    $("form label[for='answer_a']").html(data["choices"]["A"]);
    $("form label[for='answer_b']").html(data["choices"]["B"]);
    $("form label[for='answer_c']").html(data["choices"]["C"]);
    $("form label[for='answer_d']").html(data["choices"]["D"]);
}

/**
 * Resets all quiz results to 0;
 */
function resetResults() {
    attempted = 0;
    correct = 0;
    incorrect = 0;
    updateResults();
}

/**
 * Highlights the selected answer green if correct or red if 
 * incorrect. Displays next button to move to next question and
 * updates the results.
 * @param data Answer response
 */
 function handleAnswerResult(data) {
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
    $("#quiz button[value=Next]").removeClass("hidden");
    
    // display new results
    updateResults();
}

/**
 * Randomly select a new quiz ID from the given quiz list
 * @param questionList List of question IDs
 * @returns New quiz ID
 */
 function getRandomQuestionID(questionList) {
    var length = questionList["questions"].length;
    var number = Math.floor(Math.random() * (length - 1));
    var id = questionList["questions"][number];

    // if same ID is chosen call function again
    if (id === questionId) 
        id = getRandomQuestionID(questionList);
    
    return id;
}

/**
 * Makes a request for a new random question and its information,
 * then updates the quiz question.
 */
function getNewQuestion() {
    // get a list of question IDs
    makeQuizRequest().then((dataId) => {
        if (dataId) {
            // select random quiz iD
            questionId = getRandomQuestionID(dataId);
            // get quiz information
            makeQuizRequest(questionId).then((dataInfo) => {
                // update quiz
                if (dataInfo)
                    updateQuiz(dataInfo);
            });
        }
    });
}

/**
 * Makes a request with the given question ID and selected
 * answer for the answer, then handles the results.
 * @param id ID of question to check
 * @param answer User selected answer
 */
function getAnswer(id, answer) {
    // get results of selected answer and update
    makeQuizRequest(id, answer).then((data) => {
        if (data)
            handleAnswerResult(data);
    });
}

/**
 * Gets a new question and displays the submit button
 */
 function nextQuiz() {
    // get next question and update
    getNewQuestion();

    // enable selection of radio buttons
    $(".info_box input").attr("disabled", false);

    // remove correct/incorrect colour from previous response
    $("#" + checkedId)
        .prop("checked", false)
        .parent().css({"background-color": "#f5f5f5f5"});

    // hide next button and show submit button 
    $("#quiz button[value=Next]").addClass("hidden");
    $("#quiz input[value=Submit]").removeClass("hidden");
}