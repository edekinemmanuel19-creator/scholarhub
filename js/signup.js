

const tabButtons = document.querySelectorAll(".tab-btn");
const forms = document.querySelectorAll(".signup-form");

tabButtons.forEach(button => {

    button.addEventListener("click", () => {

        tabButtons.forEach(btn => btn.classList.remove("active"));

        forms.forEach(form => form.classList.remove("active"));

        button.classList.add("active");

        document
            .getElementById(button.dataset.target + "Form")
            .classList.add("active");

    });

});



const toggleIcons = document.querySelectorAll(".toggle-password");

toggleIcons.forEach(icon => {

    icon.addEventListener("click", () => {

        const input = icon.previousElementSibling;

        if (input.type === "password") {

            input.type = "text";

            icon.classList.remove("fa-eye");

            icon.classList.add("fa-eye-slash");

        } else {

            input.type = "password";

            icon.classList.remove("fa-eye-slash");

            icon.classList.add("fa-eye");

        }

    });

});


document.querySelectorAll(".terms-link").forEach(link => {
    link.addEventListener("click", (e) => {
        e.stopPropagation();
    });
});





const fileInputs = document.querySelectorAll('input[type="file"]');

fileInputs.forEach(input => {

    input.addEventListener("change", function () {

        if (this.files.length > 0) {

            alert("Selected Image: " + this.files[0].name);

        }

    });

});





forms.forEach(form => {

    form.addEventListener("submit", function(e){

        e.preventDefault();

        const passwords = form.querySelectorAll('input[type="password"]');

        if(passwords.length >=2){

            if(passwords[0].value !== passwords[1].value){

                alert("Passwords do not match.");

                return;

            }

        }

        const button = form.querySelector(".btn-signup");

        button.disabled = true;

        button.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        Creating Account...
        `;

        setTimeout(()=>{

            alert("Account Created Successfully!");

            window.location.href="login.html";

        },1800);

    });

});




const inputs = document.querySelectorAll("input, select");

inputs.forEach(input=>{

    input.addEventListener("focus",()=>{

        input.style.borderColor="#2563eb";

    });

});





document.addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        const activeForm=document.querySelector(".signup-form.active");

        if(activeForm){

            activeForm.requestSubmit();

        }

    }

});




window.addEventListener("load",()=>{

    const card=document.querySelector(".signup-card");

    card.style.opacity="0";

    card.style.transform="translateY(35px)";

    setTimeout(()=>{

        card.style.transition=".6s ease";

        card.style.opacity="1";

        card.style.transform="translateY(0)";

    },100);

});


/*=======CONSOLE MESSAGE========*/

console.log("%cScholarHub Signup Ready",
"color:#2563eb;font-size:16px;font-weight:bold;");

/*=========SCHOLARHUB SIGNUP==========*/

const signupForms = document.querySelectorAll(".signup-form");

signupForms.forEach(form => {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        
        const accountType =
            form.id === "studentForm" ? "Student" : "Tutor";

        
        const inputs = form.querySelectorAll("input, select");

        const fullName = inputs[0].value.trim();
        const email = inputs[1].value.trim().toLowerCase();
        const phone = inputs[2].value.trim();

        let location = "";
        let category = "";

        if (accountType === "Student") {

            category = inputs[5].value;
            location = inputs[6].value.trim();

        } else {

            location = inputs[3].value.trim();
            category = inputs[4].value;

        }

        const passwordInputs =
            form.querySelectorAll('input[type="password"]');

        const password = passwordInputs[0].value;
        const confirmPassword = passwordInputs[1].value;

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        
        let users =
            JSON.parse(localStorage.getItem("scholarhubUsers")) || [];

        
        const existingUser =
            users.find(user => user.email === email);

        if (existingUser) {

            alert("An account with this email already exists.");

            return;

        }

        
        const imageInput =
            form.querySelector('input[type="file"]');

        if (imageInput.files.length > 0) {

            const reader = new FileReader();

            reader.onload = function () {

                saveUser(reader.result);

            };

            reader.readAsDataURL(imageInput.files[0]);

        } else {

            saveUser("images/default-user.png");

        }

        function saveUser(profileImage) {

            const newUser = {

                id: Date.now(),

                fullName,

                email,

                phone,

                password,

                accountType,

                category,

                location,

                profileImage,

                learningxp: 0,

                progress: 0,

                studystreak: 1,

                badges: 0,

                level: "Beginner",

                resourcesOpened: false,

                communityJoined: false,

                aiUsed: false,

                loginBonusDate: ""

            };

            users.push(newUser);

            localStorage.setItem(
                "scholarhubUsers",
                JSON.stringify(users)
            );

            alert("Account Created Successfully!");

            window.location.href = "login.html";

        }

    });

});




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



const imageInputs =
document.querySelectorAll('input[type="file"]');

imageInputs.forEach(input=>{

    input.addEventListener("change",function(){

        if(this.files.length===0) return;

        const file=this.files[0];

        if(!file.type.startsWith("image/")){

            alert("Please select a valid image.");

            this.value="";

            return;

        }

        if(file.size > 5 * 1024 * 1024){

            alert("Image must not be larger than 5MB.");

            this.value="";

            return;

        }

    });

});



const emailInputs =
document.querySelectorAll('input[type="email"]');

emailInputs.forEach(email=>{

    email.addEventListener("blur",()=>{

        email.value=email.value.trim().toLowerCase();

    });

});



const phoneInputs =
document.querySelectorAll('input[type="tel"]');

phoneInputs.forEach(phone=>{

    phone.addEventListener("input",()=>{

        phone.value=
        phone.value.replace(/[^0-9]/g,'');

    });

});




const allInputs=
document.querySelectorAll("input,select");

allInputs.forEach(input=>{

    input.addEventListener("focus",()=>{

        input.style.borderColor="#2563eb";

    });

    input.addEventListener("blur",()=>{

        input.style.borderColor="#e5e7eb";

    });

});




const defaultDashboardData={

    xp:0,

    progress:0,

    streak:1,

    badges:0,

    level:"Beginner",

    resourcesOpened:false,

    communityJoined:false,

    aiUsed:false,

    firstLogin:false

};

console.log(
"%cScholarHub Signup Ready",
"color:#2563eb;font-size:16px;font-weight:bold;"
);
