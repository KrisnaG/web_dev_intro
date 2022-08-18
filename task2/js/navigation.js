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


function hideForm(form) {
    form.hide(1000, function() {
        form.addClass("hidden");
    });    
}

function showForm(form) {
    form.show(1000, function() {
        form.removeClass("hidden");
    });
}

function registerError() {
    var userMessage = $("#user_message");
    var message = "<p>Please register</p>";

    userMessage.html(message)
    userMessage.removeClass("invisible");
}

function switchToRegistration() {
    var registration = $("#registration");
    var quiz = $("#quiz");
    var results = $("#sidebar");
    
    if (registration.is(":hidden")) {
        hideForm(quiz);
        hideForm($("#score"));
        
        showForm($("#content"));
        showForm(registration);
        showForm($("#welcome"));

        results.removeClass("center_sidebar");
    }
}

function switchToQuiz() {
    var userID = parseInt($("#user_id p").text());
    var registration = $("#registration");
    var quiz = $("#quiz");
    var results = $("#sidebar");

    if (!$.isNumeric(userID)) {
        registerError();
    } else {
        if (quiz.is(":hidden")) {
            hideForm(registration);
            hideForm($("#welcome"));
            showForm($("#content"));
            showForm(quiz);
            showForm($("#score"));
            results.removeClass("center_sidebar");
        }
    }
    
}

function switchToResults() {
    var userID = parseInt($("#user_id p").text());
    var results = $("#sidebar");
    
    if (!$.isNumeric(userID))
        registerError();
    else {
        hideForm($("#quiz"));
        hideForm($("#registration"));
        hideForm($("#content"));
        hideForm($("#welcome"));
        showForm($("#score"));

        setTimeout(() => {
            results.addClass("center_sidebar");
        }, 900);
        
    }    
}