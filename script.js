const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const bottomAction = document.getElementById("bottomAction");

const formTitle = document.getElementById("formTitle");
const formSubtitle = document.getElementById("formSubtitle");
const submitText = document.getElementById("submitText");

const confirmWrapper = document.getElementById("confirmWrapper");
const loginOptions = document.getElementById("loginOptions");

const authForm = document.getElementById("authForm");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const togglePassword = document.getElementById("togglePassword");
const formMessage = document.getElementById("formMessage");

const bottomText = document.getElementById("bottomText");
const forgotPassword = document.getElementById("forgotPassword");

let currentMode = "login";

function showLogin() {
    currentMode = "login";

    loginTab.classList.add("active");
    registerTab.classList.remove("active");

    formTitle.textContent = "Welcome Back";
    formSubtitle.textContent = "Login to continue your learning journey";

    submitText.textContent = "Login";

    confirmWrapper.classList.remove("show");
    loginOptions.style.display = "flex";

    bottomText.textContent = "Don't have an account?";
    bottomAction.textContent = "Register";

    formMessage.textContent = "";
    formMessage.className = "form-message";

    confirmPassword.required = false;
}

function showRegister() {
    currentMode = "register";

    registerTab.classList.add("active");
    loginTab.classList.remove("active");

    formTitle.textContent = "Create Account";
    formSubtitle.textContent = "Register to start your learning journey";

    submitText.textContent = "Register";

    confirmWrapper.classList.add("show");
    loginOptions.style.display = "none";

    bottomText.textContent = "Already have an account?";
    bottomAction.textContent = "Login";

    formMessage.textContent = "";
    formMessage.className = "form-message";

    confirmPassword.required = true;
}

loginTab.addEventListener("click", showLogin);

registerTab.addEventListener("click", showRegister);

bottomAction.addEventListener("click", function () {
    if (currentMode === "login") {
        showRegister();
    } else {
        showLogin();
    }
});

togglePassword.addEventListener("click", function () {
    const icon = togglePassword.querySelector("i");

    if (password.type === "password") {
        password.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        password.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
});

authForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const passwordValue = password.value;
    const confirmValue = confirmPassword.value;

    formMessage.className = "form-message";

    if (currentMode === "register") {

        if (passwordValue !== confirmValue) {
            formMessage.textContent = "Passwords do not match.";
            formMessage.classList.add("error");
            return;
        }

        if (passwordValue.length < 6) {
            formMessage.textContent = "Password must contain at least 6 characters.";
            formMessage.classList.add("error");
            return;
        }

        localStorage.setItem(
            "spirexUser",
            JSON.stringify({
                email: email,
                password: passwordValue
            })
        );

        formMessage.textContent = "Registration successful. You can now login.";
        formMessage.classList.add("success");

        setTimeout(() => {
            showLogin();
            document.getElementById("email").value = email;
        }, 1200);

    } else {

        const savedUser = JSON.parse(localStorage.getItem("spirexUser"));

        if (!savedUser) {
            formMessage.textContent = "No account found. Please register first.";
            formMessage.classList.add("error");
            return;
        }

        if (
            email === savedUser.email &&
            passwordValue === savedUser.password
        ) {
            formMessage.textContent = "Login successful. Welcome to SpireX!";
            formMessage.classList.add("success");

            localStorage.setItem("spirexLoggedIn", "true");

            setTimeout(() => {
                formMessage.textContent = "You are now logged in.";
            }, 1000);

        } else {
            formMessage.textContent = "Invalid email or password.";
            formMessage.classList.add("error");
        }
    }
});

forgotPassword.addEventListener("click", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();

    if (!email) {
        formMessage.textContent = "Enter your email address first.";
        formMessage.className = "form-message error";
        return;
    }

    formMessage.textContent = "Password reset request received.";
    formMessage.className = "form-message success";
});

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function () {
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});
