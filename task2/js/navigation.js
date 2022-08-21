/**
 * navigation.js
 * @author Krisna Gusti
 * @brief 
 */

// Window onLoad actions and listeners
$(function() {
    $("#registration-link").click(switchToRegistration);
    $("#quiz-link").click(switchToQuiz);
    $("#results-link").click(switchToResults);
    $("#start").click(switchToQuiz);
});

/**
 * 
 * @param form 
 */
function hideForm(form) {
    form.addClass("hidden");
}

/**
 * 
 * @param form 
 */
function showForm(form) {
    form.css({"opacity" : "0"})
        .removeClass("hidden")
        .animate({
            "opacity" : "1"
        }, 700);
}

/**
 * 
 */
function registerError() {
    var userMessage = $("#user_message");
    var message = "<p>Please register</p>";

    // add message and display
    userMessage.html(message)
    userMessage.removeClass("invisible");
}

/**
 * 
 */
function switchToRegistration() {
    var registration = $("#registration");
    
    if (registration.is(":hidden")) {
        // hide all content
        hideForm($("#quiz"));
        hideForm($("#score"));
        $("#sidebar").removeClass("center_sidebar");

        // show registration
        showForm(registration);
        showForm($("#content"));
        showForm($("#welcome"));
        
    }
}

/**
 * 
 */
function switchToQuiz() {
    var userID = parseInt($("#user_id p").text());
    var quiz = $("#quiz");

    // check if user is logged in
    if (!$.isNumeric(userID)) {
        registerError();
    } else {
        // check if quiz is already showing 
        if (quiz.is(":hidden")) {
            // hide all content
            hideForm($("#welcome"));
            hideForm($("#registration"));
            $("#sidebar").removeClass("center_sidebar");
            
            // show quiz content
            showForm(quiz);
            showForm($("#content"));
            showForm($("#score"));
        }
    }
    
}

/**
 * 
 */
function switchToResults() {
    var userID = parseInt($("#user_id p").text());
    var results = $("#sidebar");
    
    // check if user is logged in
    if (!$.isNumeric(userID))
        registerError();
    else {
        // hide all content
        hideForm($("#quiz"));
        hideForm($("#registration"));
        hideForm($("#content"));
        hideForm($("#welcome"));

        // show quiz content
        showForm($("#score"));
        results.addClass("center_sidebar");
    }    
}