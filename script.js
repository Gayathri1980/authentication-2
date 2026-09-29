const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");

const formTitle = document.getElementById("formTitle");
const formSubtitle = document.getElementById("formSubtitle");

const confirmBox = document.getElementById("confirmBox");
const confirmPassword = document.getElementById("confirmPassword");

const loginOptions = document.getElementById("loginOptions");

const buttonText = document.getElementById("buttonText");

const switchText = document.getElementById("switchText");
const switchButton = document.getElementById("switchButton");

const authForm = document.getElementById("authForm");

const email = document.getElementById("email");
const password = document.getElementById("password");

const togglePassword =
    document.getElementById("togglePassword");

const forgotPassword =
    document.getElementById("forgotPassword");

const message =
    document.getElementById("message");

let registerMode = false;


function showMessage(text, success) {

    message.textContent = text;

    message.style.color =
        success ? "#21804e" : "#c7473d";
}


function clearMessage() {
    message.textContent = "";
}


function loginMode() {

    registerMode = false;

    loginTab.classList.add("active");
    registerTab.classList.remove("active");

    formTitle.textContent = "Welcome Back";

    formSubtitle.textContent =
        "Login to continue your learning journey";

    buttonText.textContent = "Login";

    confirmBox.style.display = "none";

    confirmPassword.required = false;

    loginOptions.style.display = "flex";

    switchText.textContent =
        "Don't have an account?";

    switchButton.textContent =
        "Register";

    clearMessage();
}


function registerModeFunction() {

    registerMode = true;

    registerTab.classList.add("active");
    loginTab.classList.remove("active");

    formTitle.textContent =
        "Create Account";

    formSubtitle.textContent =
        "Join the SpireX learning community";

    buttonText.textContent =
        "Create Account";

    confirmBox.style.display =
        "block";

    confirmPassword.required =
        true;

    loginOptions.style.display =
        "none";

    switchText.textContent =
        "Already have an account?";

    switchButton.textContent =
        "Login";

    clearMessage();
}


loginTab.addEventListener(
    "click",
    loginMode
);


registerTab.addEventListener(
    "click",
    registerModeFunction
);


switchButton.addEventListener(
    "click",
    function () {

        if (registerMode) {
            loginMode();
        } else {
            registerModeFunction();
        }

    }
);


togglePassword.addEventListener(
    "click",
    function () {

        if (password.type === "password") {

            password.type = "text";

            togglePassword.innerHTML =
                '<i class="fa-regular fa-eye-slash"></i>';

        } else {

            password.type = "password";

            togglePassword.innerHTML =
                '<i class="fa-regular fa-eye"></i>';

        }

    }
);


authForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const emailValue =
            email.value.trim();

        const passwordValue =
            password.value.trim();


        if (!emailValue || !passwordValue) {

            showMessage(
                "Please enter all required fields.",
                false
            );

            return;
        }


        if (passwordValue.length < 6) {

            showMessage(
                "Password must contain at least 6 characters.",
                false
            );

            return;
        }


        if (registerMode) {

            const confirmValue =
                confirmPassword.value.trim();


            if (passwordValue !== confirmValue) {

                showMessage(
                    "Passwords do not match.",
                    false
                );

                return;
            }


            const user = {
                email: emailValue,
                password: passwordValue
            };


            localStorage.setItem(
                "spirexUser",
                JSON.stringify(user)
            );


            showMessage(
                "Account created successfully!",
                true
            );


            setTimeout(
                function () {

                    loginMode();

                    email.value =
                        emailValue;

                    password.value = "";

                    confirmPassword.value = "";

                },
                1000
            );

        } else {

            const savedUser =
                localStorage.getItem(
                    "spirexUser"
                );


            if (!savedUser) {

                showMessage(
                    "No account found. Please register first.",
                    false
                );

                return;
            }


            const user =
                JSON.parse(savedUser);


            if (
                user.email === emailValue &&
                user.password === passwordValue
            ) {

                localStorage.setItem(
                    "spirexLoggedIn",
                    "true"
                );


                showMessage(
                    "Login successful! Welcome to SpireX LMS.",
                    true
                );

            } else {

                showMessage(
                    "Invalid email or password.",
                    false
                );

            }

        }

    }
);


forgotPassword.addEventListener(
    "click",
    function () {

        const emailValue =
            email.value.trim();


        if (!emailValue) {

            showMessage(
                "Enter your email address first.",
                false
            );

            email.focus();

            return;
        }


        showMessage(
            "Password reset request submitted.",
            true
        );

    }
);


loginMode();