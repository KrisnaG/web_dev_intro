/**
 * 
 */

// Window onLoad listener
window.onload = () => {
    document.getElementById("registration").addEventListener("submit", validate);
    document.getElementById("registration").addEventListener("reset", clearErrors);
}

var loggedIn = false;

/**
 * 
 */
function clearErrors() {
    document.getElementById('user_message').className = 'invisible';
    document.getElementById('user_message').innerHTML = '';
}

/**
 * 
 * @param {*} err 
 */
function addError(err) {
    var p = document.createElement("p");
    var text = document.createTextNode(err);
    p.appendChild(text);
    document.getElementById('user_message').appendChild(p);
    document.getElementById('user_message').className = 'none';
}

/**
 * 
 * @param {*} e 
 */
function validate(e) {
    var successful = true;
    
    e.preventDefault();
    clearErrors();

    if (!validateName(document.getElementById('name').value)) 
        successful = false;
    if (!validateAge(document.getElementById('age').value)) 
        successful = false;
    if (!validateEmail(document.getElementById('email').value)) 
        successful = false;
    if (!validatePhone(document.getElementById('phone').value)) 
        successful = false;

    if (successful)
        registerUser();
}

/**
 * 
 * @param {*} name 
 * @returns 
 */
function validateName(name) {
    if (!name) {
        addError("Name must not be empty");
        return false;
    }
    if (name.length < 2 && name.length > 100) {
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
 * 
 * @param {*} age 
 * @returns 
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
 * 
 * @param {*} email 
 * @returns 
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
 * 
 * @param {*} phone 
 * @returns 
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
 * 
 */
function registerUser() {
    $.ajax({
        url: 'http://turing.une.edu.au/~jbisho23/assignment2/register.php',
        method: 'POST',
        data: {
            name : document.getElementById('name').value,
            age : document.getElementById('age').value,
            email : document.getElementById('email').value,
            phone : document.getElementById('phone').value
        },
        dataType: 'json',
        success: function(data) {
            loggedIn = true;

            // display user id
            $('#user_id p').html(data["user_id"]);

            // hide registration
            $('#registration').slideUp(500, function() {
                $('#registration').addClass('hidden');
            });
              
            $('#quiz').slideDown(500, function() {
                $('#quiz').removeClass('hidden');
            });

            $('#welcome').addClass('hidden');
            $('#score').removeClass('hidden');
        },
        error: function(jqXHR) {
            var $e = JSON.parse(jqXHR.responseText);
            console.log('Status code: '+$e.error);
            console.log('Error message: '+$e.message);
        }
    });
}