/**
 * navigation.js
 * @author Krisna Gusti
 * @brief Handles the transitions between the navigational links
 * that can switch between registration, quiz and results.
 */

// Window onLoad actions and listeners
$(function() {
    $("#registration-link").click(switchToRegistration);
    $("#quiz-link").click(switchToQuiz);
    $("#results-link").click(switchToResults);
    $("#start").click(switchToQuiz);
});

/**
 * Adds the class hidden to the given form to hide it
 * @param form Form to hide
 */
function hideForm(form) {
    form.addClass("hidden");
}

/**
 * Removes the class hidden from a given class and
 * transitions to show it.
 * @param form Form to show
 */
function showForm(form) {
    form.css({"opacity" : "0"})
        .removeClass("hidden")
        .animate({
            "opacity" : "1"
        }, 700);
}

/**
 * Adds a registration error to user message
 */
function registerError() {
    var userMessage = $("#user_message");
    var message = "<p>Please register first</p>";

    // add message and display
    userMessage.html(message)
    userMessage.removeClass("invisible");
}

/**
 * Transition to the registration menu
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
 * Transition to the quiz menu
 */
function switchToQuiz() {
    var userID = parseInt($("#user_id p").text());
    var quiz = $("#quiz");

    // clear any errors
    window.clearErrors();

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
 * Transition to the results menu
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