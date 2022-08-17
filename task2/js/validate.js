/**
 * 
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
 * 
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
    if (!name) {
        addError("Name must not be empty");
        return false;
    }
    if (name.length < 2 || name.length > 100) {
        addError("Name must be between 2 and 100 characters long");
        return false;
    }
    if (!/^[a-zA-Z'-]+$/.test(name)) {
        addError("Name must only contain upper and lower case, hyphen, or apostrophe characters");
        return false;
    }
    return true;
}

/**
 * Validates a given users age.
 * @param age users age to validate
 * @returns true within specifications, otherwise false
 */
function validateAge(age) {
    if (!age) {
        addError("Age must not be empty");
        return false;
    }
    if (!/^[0-9]+$/.test(age)) {
        addError("Age must be a number");
        return false;
    }
    if (parseInt(age) < 13 || parseInt(age) > 130) {
        addError("Age must be between 13 and 130");
        return false;
    }
    return true;
}

/**
 * Validates a given users email.
 * @param email users age to validate
 * @returns true within specifications, otherwise false
 */
function validateEmail(email) {
    if (!email) {
        addError("Email must not be empty");
        return false;
    }
    if (!/^[a-zA-Z-]([\w-.]+)?@([\w-]+\.)+[\w]+$/.test(email)) {
        addError("Invalid email address");
        return false;
    }
    return true;
}

/**
 * Validates a given users phone number. Phone number may be empty.
 * @param phone users phone number to validate
 * @returns true within specifications, otherwise false
 */
function validatePhone(phone) {
    if (phone) {
        if (!/^[0-9]+$/.test(phone)) {
            addError("Phone number must only be numbers");
            return false;
        }
        if (phone.length != 10) {
            addError("Phone number must be ten digits long");
            return false;
        }
        if (!/^04/.test(phone)) {
            addError("Phone number must begin with a 04");
            return false;
        }
    }
    return true;
}

/**
 * Registers 
 * @param name valid users name
 * @param age valid users age
 * @param email valid users email
 * @param phone valid users phone
 */
function registerUser(name, age, email, phone) {
    $.ajax({
        url: "http://turing.une.edu.au/~jbisho23/assignment2/register.php",
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

            // hide registration
            $("#registration").slideUp(500, function() {
                $("#registration").addClass("hidden");
            });
            
            // show quiz
            $("#quiz").slideDown(500, function() {
                $("#quiz").removeClass("hidden");
            });

            // hide welcome sidebar, show score sidebar
            $("#welcome").addClass("hidden");
            $("#score").removeClass("hidden");
        },
        error: function(jqXHR) {
            var $e = JSON.parse(jqXHR.responseText);
            console.log("Status code: " + $e.error);
            console.log("Error message: " + $e.message);
        }
    });
}