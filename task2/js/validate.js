/**
 * validate.js
 * @author Krisna Gusti
 * @brief Validates the form data before it is sent to the server.
 * A user error message is displayed for each invalid response.
 * Validation is done in vanilla JavaScript. Once the form data is 
 * valid, it sends the data to the server via AJAX request. A 
 * response is returned from the sever with the users ID, then the 
 * user id is updated and it switches to the quiz form.Handles any 
 * error messages.
 */

// Window onLoad listener
window.onload = () => {
    document.getElementById("registration").addEventListener("submit", validate);
    document.getElementById("registration").addEventListener("reset", clearErrors);
}

/**
 * Removes all user message errors.
 */
function clearErrors() {
    var userMessage = document.getElementById("user_message");

    // hide user message box and clear its content
    userMessage.classList.add("invisible");
    userMessage.innerHTML = "";
}

/**
 * Adds a given user message error element
 * @param error error description
 */
function addError(error) {
    var p = document.createElement("p");
    var text = document.createTextNode(error);
    var userMessage = document.getElementById("user_message");

    // add element and remove invisible class
    p.appendChild(text);
    userMessage.appendChild(p);
    userMessage.classList.remove("invisible");
}

/**
 * Validates a users name, age, email and phone number
 * from the submit form.
 * @param event submit event
 */
function validate(event) {
    var successful = true;
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    
    // prevent submit from submitting
    event.preventDefault();
    clearErrors();

    // validates user details
    if (!validateName(name)) 
        successful = false;
    if (!validateAge(age)) 
        successful = false;
    if (!validateEmail(email)) 
        successful = false;
    if (!validatePhone(phone)) 
        successful = false;

    // if valid user details register user
    if (successful)
        registerUser(name, age, email, phone);
}

/**
 * Validates a given users name.
 * @param name users age to validate
 * @returns true within specifications, otherwise false
 */
function validateName(name) {
    var valid = true;

    if (!name) {
        addError("Name must not be empty");
        valid =false;
    }
    if (name.length < 2 || name.length > 100) {
        addError("Name must be between 2 and 100 characters long");
        valid = false;
    }
    if (!/^[a-zA-Z'-]+$/.test(name)) {
        addError("Name must only contain upper and lower case, hyphen, or apostrophe characters");
        valid = false;
    }

    return valid;
}

/**
 * Validates a given users age.
 * @param age users age to validate
 * @returns true within specifications, otherwise false
 */
function validateAge(age) {
    var valid = true;

    if (!age) {
        addError("Age must not be empty");
        valid = false;
    }
    if (!/^[0-9]+$/.test(age) || (parseInt(age) < 13) || 
            (parseInt(age) > 130)) {
        addError("Age must be an integer value between 13 and 130");
        valid = false;
    }

    return valid;
}

/**
 * Validates a given users email.
 * @param email users age to validate
 * @returns true within specifications, otherwise false
 */
function validateEmail(email) {
    var valid = true;

    if (!email) {
        addError("Email must not be empty");
        valid = false;
    }
    if (!/^[a-zA-Z-]([\w-.]+)?@([\w-]+\.)+[\w]+$/.test(email)) {
        addError("Email must be a valid email address");
        valid = false;
    }

    return valid;
}

/**
 * Validates a given users phone number. Phone number may be empty.
 * @param phone users phone number to validate
 * @returns true within specifications, otherwise false
 */
function validatePhone(phone) {
    var valid = true;

    if (phone) {
        if (phone.length != 10) {
            addError("Phone number must be ten digits long");
            valid = false;
        }
        if (!/^[0-9]+$/.test(phone)) {
            addError("Phone number must only be numbers");
            valid = false;
        }
        if (!/^04/.test(phone)) {
            addError("Phone number must begin with a 04");
            valid = false;
        }
    }

    return valid;
}

/**
 * Registers a user with the server then updates user id and switches
 * to the quiz form.
 * @param name valid users name
 * @param age valid users age
 * @param email valid users email
 * @param phone valid users phone
 */
function registerUser(name, age, email, phone) {
    var userID = parseInt($("#user_id p").text());
    var url = "http://turing.une.edu.au/~jbisho23/assignment2/register.php";

    $.ajax({
        url: url,
        method: "POST",
        data: {
            name : name,
            age : age,
            email : email,
            phone : phone
        },
        dataType: "json",
        success: function(data) {
            // display user id
            $("#user_id p").html(data["user_id"]);
            
            // setup quiz
            window.nextQuiz();
            window.resetResults();

            // hide registration and welcome
            $("#registration").addClass("hidden");
            $("#welcome").addClass("hidden");
            
            // show quiz and score after short delay
            setTimeout(() => {
                $("#quiz").removeClass("hidden");
                $("#score").removeClass("hidden");
            }, 250);
                   
            // clear registration form content
            $("#registration")[0].reset();
        },
        error: function(jqXHR) {
            var $e = JSON.parse(jqXHR.responseText);
            console.log("Status code: " + $e.error);
            console.log("Error message: " + $e.message);
        }
    });

}