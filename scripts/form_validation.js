function Account(email, fname, lname, password, city, address) {
    this.email = email;
    this.fname = fname;
    this.lname = lname;
    this.password = password;
    this.city = city;
    this.address = address;

}

function Database() {
    this.accounts = [];
}

Database.prototype.addAccount = function (account) {
    if (!this.isExistingAccount(account.email)) {
        this.accounts.push(account);
    } else {
        document.getElementById("error").innerText = "Email is already used for an account";
    }
}

Database.prototype.isExistingAccount = function (email) {
    for (let i = 0; i < this.accounts.length; i++) {
        if (this.accounts[i].email === email) {
            return true;
        }
    }

    return false;
};

Database.prototype.isValidAccount = function (email, password) {
    for (let i = 0; i < this.accounts.length; i++) {
        if (this.accounts[i].email === email && this.accounts[i].password === password) {
            return true;
        }
    }

    return false;
};

let data = localStorage.getItem("data");
let database = new Database();
if (data === null) {
    database = new Database();
} else {
    database.accounts = dataToArray(data);
}

function dataToArray(data) {
    let result = [];
    let email;
    let password;

    for (let i = 0; i < data.length; i++) {
        email = "";
        password = "";
        while (data[i] !== ',') {
            email += data[i];
            i++;
        }
        i++;

        while (data[i] !== '\n') {
            password += data[i];
            i++;
        }

        if (email !== "" && password !== "") {
            result.push(new Account(email, "", "", password, "", ""));
        }
    }

    return result;

}

function dataToString(data) {
    let result = "";

    for (let i = 0; i < data.length; i++) {
        result += data[i].email + "," + data[i].password + "\n";
    }

    return result;
}

function check() {
    let isCorrect = true;

    const email = document.getElementById("email");
    const emailError = document.getElementById("error_email");

    const fname = document.getElementById("name_first");
    const fnameError = document.getElementById("error_fname");

    const lname = document.getElementById("name_last");
    const lnameError = document.getElementById("error_lname");

    const city = document.getElementById("city");
    const cityError = document.getElementById("error_city");

    const address = document.getElementById("address");
    const addressError = document.getElementById("error_address");

    const password = document.getElementById("password");
    const passowrdError = document.getElementById("error_password");

    if (email.value === "") {
        emailError.style.visibility = "visible";
        emailError.innerHTML = "Please enter email";
        isCorrect = false;
    } else if (!isCorrectEmail(email.value)) {
        emailError.style.visibility = "visible";
        emailError.innerHTML = "Please enter valid email(example@mail.com)";
        isCorrect = false;
    } else if (database.isExistingAccount(email.value)) {
        emailError.style.visibility = "visible";
        emailError.innerHTML = "Email is already used for an account";
        isCorrect = false;
    } else {
        emailError.style.visibility = "hidden";
        emailError.innerHTML = "No errors";
    }

    if (fname.value === "") {
        fnameError.style.visibility = "visible";
        fnameError.innerHTML = "Please enter first name";
        isCorrect = false;
    } else {
        fnameError.style.visibility = "hidden";
        fnameError.innerHTML = "No errors";
    }

    if (lname.value === "") {
        lnameError.style.visibility = "visible";
        lnameError.innerHTML = "Please enter last name";
        isCorrect = false;
    } else {
        lnameError.style.visibility = "hidden";
        lnameError.innerHTML = "No errors";
    }

    if (city.value === "") {
        cityError.style.visibility = "visible";
        cityError.innerHTML = "Please enter city";
        isCorrect = false;
    } else {
        cityError.style.visibility = "hidden";
        cityError.innerHTML = "No errors";
    }

    if (address.value === "") {
        addressError.style.visibility = "visible";
        addressError.innerHTML = "Please enter address";
        isCorrect = false;
    } else {
        addressError.style.visibility = "hidden";
        addressError.innerHTML = "No errors";
    }

    if (password.value === "") {
        passowrdError.style.visibility = "visible";
        passowrdError.innerHTML = "Please enter password";
        isCorrect = false;
    } else if (password.value.length <= 7) {
        passowrdError.style.visibility = "visible";
        passowrdError.innerHTML = "Password must be at least 8 characters long";
        isCorrect = false;
    } else if (!isCorrectPass(password.value)) {
        passowrdError.style.visibility = "visible";
        passowrdError.innerHTML = "Password must contain at least one digit and one uppercase letter";
        isCorrect = false;
    } else {
        passowrdError.style.visibility = "hidden";
        passowrdError.innerHTML = "No errors";
    }

    if (isCorrect) {
        database.addAccount(new Account(email.value, fname.value, lname.value, password.value, city.value, address.value));
        localStorage.setItem("data", dataToString(database.accounts));
        window.location.href = "login.html";
        alert("Successful registration");
    }

    window.scrollTo(0, 0);
}

function checkLogin() {
    const email = document.forms["login_form"]["email"];
    const password = document.forms["login_form"]["password"];
    const error = document.getElementById("error");

    if (email.value === "" || password.value === "") {
        error.style.visibility = "visible";
        error.innerHTML = "Please enter email and password";
    } else if (database.isValidAccount(email.value, password.value)) {
        error.style.visibility = "hidden";
        error.innerHTML = "No errors";
        window.location.href = "index.html";
        alert("Successful login");
    } else {
        error.style.visibility = "visible";
        error.innerHTML = "Incorrect email or password";
    }
}

function isCorrectPass(pass) {
    let hasUpperCase = false;
    let hasDigit = false;

    for (let i = 0; i < pass.length; i++) {
        if (pass[i].charCodeAt(0) >= 48 && pass[i].charCodeAt(0) <= 57) {
            hasDigit = true;
        } else if (pass[i].charCodeAt(0) >= 65 && pass[i].charCodeAt(0) <= 90) {
            hasUpperCase = true;
        }

        if (hasDigit && hasUpperCase) {
            return true;
        }
    }

    return false;
}

function isCorrectEmail(email) {
    let hasAt = false;
    let hasDot = false;
    let atIndex;
    let lastDotIndex;

    for (let i = 0; i < email.length; i++) {
        if (email[i].charCodeAt(0) < 97 || email[i].charCodeAt(0) > 122) {
            if (email[i] == '@') {
                if (hasAt) {
                    return false;
                }

                hasAt = true;
                atIndex = i;
            } else if (email[i] == '.') {
                hasDot = true;
                lastDotIndex = i;
            } else if (email[i] != '-') {
                return false;
            }
        }
    }

    return (hasAt && hasDot && (atIndex < lastDotIndex) && (lastDotIndex - atIndex) > 1 && (lastDotIndex != email.length - 1));
}