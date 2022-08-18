/**
 * quiz.js
 * @author Krisna Gusti
 * @brief 
 */

// Window onLoad actions and listeners
$(function() {
    // initial quiz setup
    //getNewQuestion();
    
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
var checkedId;                  // answer input id
var questionId;                 // question id
var attempted;                  // total number of questions attempted
var correct;                    // total number of questions correct
var incorrect;                  // total number of questions incorrect'

/**
 * Print out the 
 * @param jqXHR 
 */
 function printRequestError(jqXHR) {
    var $error = JSON.parse(jqXHR.responseText);
    console.log("Status code: " + $error.error);
    console.log("Error message: " + $error.message);
}

/**
 * 
 * @param question 
 * @param answer 
 * @returns 
 */
async function makeRequest(question = null, answer = null) {
    var input = {};
    
    if (question) input['q'] = question;
    if (answer) input['a'] = answer;

    let result = await $.ajax({
        url: "http://turing.une.edu.au/~jbisho23/assignment2/quiz.php",
        method: "GET",
        data: input
    }).catch(err => {
        printRequestError(err)
    });

    return result;
}

/**
 * Update user results
 */
 function updateResults() {
    $("#attempted").html("Attempted: " + attempted);
    $("#correct").html("Correct: " + correct);
    $("#incorrect").html("Incorrect: " + incorrect);
}

/**
 * Update quiz questions and response
 * @param data 
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
 * 
 * @param data 
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
    $("#quiz input[type=submit]").addClass("hidden");
    $("#quiz button[type=next]").removeClass("hidden");
    
    // display new results
    updateResults();
}

/**
 * 
 * @param data 
 * @returns 
 */
 function getRandomQuestionID(questionList) {

    var length = questionList["questions"].length;
    var randn = Math.floor(Math.random() * (length - 1));
    var id = questionList["questions"][randn];

    if (id === questionId) 
        id = getRandomQuestionID(questionList);
    
    return id;
}

/**
 * 
 */
function getNewQuestion() {
    //
    makeRequest().then((data) => {
        if (data) {
            questionId = getRandomQuestionID(data);
    
            //
            makeRequest(questionId).then((data) => {
                if (data)
                    updateQuiz(data);
            });
        }
    });
}

/**
 * 
 * @param id 
 * @param answer 
 */
function getAnswer(id, answer) {
    makeRequest(id, answer).then((data) => {
        if (data)
            handleAnswerResult(data);
    });
}

/**
 * 
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
    $("#quiz button[type=next]").addClass("hidden");
    $("#quiz input[type=submit]").removeClass("hidden");
}