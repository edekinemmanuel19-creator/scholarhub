

const passwordInput = document.getElementById("password");
const togglePassword = document.querySelector(".toggle-password");

if (togglePassword && passwordInput) {

    togglePassword.addEventListener("click", () => {

        const type = passwordInput.getAttribute("type") === "password"
            ? "text"
            : "password";

        passwordInput.setAttribute("type", type);

        togglePassword.classList.toggle("fa-eye");
        togglePassword.classList.toggle("fa-eye-slash");

    });

}





const inputs = document.querySelectorAll(".input-group input");

inputs.forEach(input => {

    input.addEventListener("focus", () => {

        input.parentElement.classList.add("active");

    });

    input.addEventListener("blur", () => {

        if (input.value === "") {

            input.parentElement.classList.remove("active");

        }

    });

});




document.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

        const active = document.activeElement;

        if (active && active.tagName === "INPUT") {

            loginForm.requestSubmit();

        }

    }

});




window.addEventListener("load", () => {

    document.body.style.opacity = "0";

    document.body.style.transition = "opacity .6s ease";

    setTimeout(() => {

        document.body.style.opacity = "1";

    }, 100);

});


/*===========CONSOLE MESSAGE=============*/

console.log("%cScholarHub Login Ready",
"color:#2563eb;font-size:16px;font-weight:bold;");

/*======== SCHOLARHUB LOGIN=========*/
const loginForm = document.querySelector(".login-form");

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    

    const email = document
        .querySelector('input[type="email"]')
        .value
        .trim()
        .toLowerCase();

    const password = document
        .querySelector('input[type="password"]')
        .value;

    

    const users = JSON.parse(
        localStorage.getItem("scholarhubUsers")
    ) || [];

    

    const currentUser = users.find(user =>

        user.email === email &&
        user.password === password

    );

    

    if (!currentUser) {

        alert("Invalid Email or Password.");

        return;

    }

    

    localStorage.setItem(

        "currentScholarHubUser",

        JSON.stringify(currentUser)

    );

    

    const loginButton = document.querySelector(".btn-login");

    loginButton.disabled = true;

    loginButton.innerHTML = `

        <i class="fa-solid fa-spinner fa-spin"></i>

        Logging In...

    `;

    

    setTimeout(() => {

        window.location.href = "dashboard.html";

    }, 1500);

});




const today = new Date().toDateString();

let users = JSON.parse(
    localStorage.getItem("scholarhubUsers")
) || [];

let loggedUser = JSON.parse(
    localStorage.getItem("currentScholarHubUser")
);

if(loggedUser){

    const userIndex = users.findIndex(
        user => user.id === loggedUser.id
    );

    if(userIndex !== -1){

        if(users[userIndex].loginBonusDate !== today){

            users[userIndex].loginBonusDate = today;

            users[userIndex].xp += 5;

            users[userIndex].streak += 1;

            users[userIndex].badges += 1;

            users[userIndex].level =
            calculateLevel(users[userIndex].xp);

            localStorage.setItem(
                "scholarhubUsers",
                JSON.stringify(users)
            );

            localStorage.setItem(
                "currentScholarHubUser",
                JSON.stringify(users[userIndex])
            );

        }

    }

}




function calculateLevel(xp){

    if(xp >= 500){

        return "Master Scholar";

    }

    if(xp >= 300){

        return "Expert";

    }

    if(xp >= 180){

        return "Scholar";

    }

    if(xp >= 80){

        return "Learner";

    }

    return "Beginner";

}




window.addEventListener("load",()=>{

    const currentUser = JSON.parse(

        localStorage.getItem(
            "currentScholarHubUser"
        )

    );

    if(currentUser){

        console.log(

            "Welcome back " +
            currentUser.fullName

        );

    }

});




function logout(){

    localStorage.removeItem(
        "currentScholarHubUser"
    );

    window.location.href="login.html";

}



const logininputs =
document.querySelectorAll("input");

inputs.forEach(input=>{

    input.addEventListener("focus",()=>{

        input.style.borderColor="#2563eb";

    });

    input.addEventListener("blur",()=>{

        input.style.borderColor="#e5e7eb";

    });

});




document.addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        loginForm.requestSubmit();

    }

});

console.log(
"%cScholarHub Login Ready",
"color:#2563eb;font-size:16px;font-weight:bold;"
);