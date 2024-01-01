let signupName = document.getElementById('signupName')
let signupEmail = document.getElementById('signupEmail')
let signupPassword = document.getElementById('signupPassword')
let signinEmail = document.getElementById('signinEmail')
let signinPassword = document.getElementById('signinPassword')
let pathparts = location.pathname.split('/');
let arr = ''
for (let i = 0; i < pathparts.length - 1; i++) {
    arr += '/' + pathparts[i]
}
function Login() {
    if (signinPassword.value == "" || signinEmail.value == "") {
        return false
    } else {
        return true
    }
}
function login() {
    if (Login() == false) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">Invalid email address</span>'
        return false
    }
    let password = signinPassword.value
    let email = signinEmail.value
    for (let i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == email.toLowerCase() && signUpArray[i].password.toLowerCase() == password.toLowerCase()) {
            localStorage.setItem('sessionUsername', signUpArray[i].name)
            if (arr == '/') {
                location.replace('https://' + location.hostname + '/home.html')
            } else {
                location.replace(arr + '/home.html')
            }
        } else {
            document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">Invalid email address</span>'
        }
    }

}

let username = localStorage.getItem('sessionUsername')
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username
}
let signUpArray = []
if (localStorage.getItem('users') == null) {
    signUpArray = []
} else {
    signUpArray = JSON.parse(localStorage.getItem('users'))
}

function Empty() {
    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        return false
    } else {
        return true
    }
}
function isEmailExist() {
    for (let i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return false
        }
    }
}
function signUp() {
    if (Empty() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">Invalid email address</span>'
        return false
    }
    let signUp = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    }
    if (signUpArray.length == 0) {
        signUpArray.push(signUp)
        localStorage.setItem('users', JSON.stringify(signUpArray))
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
        return true
    }
    if (isEmailExist() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">email already exists</span>'

    } else {
        signUpArray.push(signUp)
        localStorage.setItem('users', JSON.stringify(signUpArray))
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
    }
}


function logout() {
    localStorage.removeItem('sessionUsername')
}