// Window onLoad listener
window.onload = () => {
    document.getElementById("registration").addEventListener("submit", validate);
    document.getElementById("registration").addEventListener("reset", clearForm);
}

function clearForm(e) {
    document.getElementById('user_message').className = 'invisible';
    clearErrors();
}

// errors must be displayed in the #user_message HTML element
function addError(err) {
    var p = document.createElement("p");
    var text = document.createTextNode(err);
    p.appendChild(text);
    document.getElementById('user_message').appendChild(p);
    document.getElementById('user_message').className = 'none';
}

function clearErrors() {
    document.getElementById('user_message').innerHTML = '';
}

function validate(e) {
    let successful = true;

    clearErrors();

    e.preventDefault();

    if (!validateName(document.getElementById('name').value)) 
        successful = false;
    if (!validateAge(document.getElementById('age').value)) 
        successful = false;
    if (!validateEmail(document.getElementById('email').value)) 
        successful = false;
    if (!validatePhone(document.getElementById('phone').value)) 
        successful = false;

    if (!successful)
        e.preventDefault();
    else
    console.log("okay")
}

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