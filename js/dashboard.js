

const currentUser = JSON.parse(
    localStorage.getItem("currentScholarHubUser")
);

if (!currentUser) {

    window.location.href = "login.html";

}


const userName = document.getElementById("userName");

const profileName = document.getElementById("profileName");

const profileEmail = document.getElementById("profileEmail");

const profilePhone = document.getElementById("profilePhone");

const profileLocation = document.getElementById("profileLocation");

const accountType = document.getElementById("accountType");

const userCategory = document.getElementById("userCategory");

const profileImage = document.getElementById("profileImage");

const userLevel = document.getElementById("userLevel");

const xpValue = document.getElementById("xpValue");

const progressText = document.getElementById("progressText");

const progressFill = document.getElementById("progressFill");

const streakValue = document.getElementById("streakValue");

const badgeValue = document.getElementById("badgeValue");

/*= DEFAULT VALUES==*/

if(currentUser.learningXP === undefined){

    currentUser.learningXP = 0;

}

if(currentUser.progress === undefined){

    currentUser.progress = 0;

}

if(currentUser.badges === undefined){

    currentUser.badges = 0;

}

if(currentUser.studyStreak === undefined){

    currentUser.studyStreak = 1;

}

/*===========LOAD PROFILE========*/

function loadProfile(){

    userName.textContent = currentUser.fullName;

    profileName.textContent = currentUser.fullName;

    profileEmail.textContent = currentUser.email;

    profilePhone.textContent = currentUser.phone;

    profileLocation.textContent = currentUser.location;

    accountType.textContent = currentUser.accountType;

    userCategory.textContent = currentUser.category;

    if(currentUser.profileImage){

        profileImage.src = currentUser.profileImage;

    }

    xpValue.textContent = currentUser.learningXP + " XP";

    progressText.textContent = currentUser.progress + "%";

    progressFill.style.width = currentUser.progress + "%";

    streakValue.textContent = currentUser.studyStreak + " Day(s)";

    badgeValue.textContent = currentUser.badges + " Badges";

    calculateLevel();

}

/*========= LEVEL SYSTEM========*/

function calculateLevel(){

    let xp = currentUser.learningXP;

    let level = "Beginner";

    if(xp >= 50){

        level = "Learner";

    }

    if(xp >= 150){

        level = "Scholar";

    }

    if(xp >= 300){

        level = "Expert";

    }

    if(xp >= 500){

        level = "Master Scholar";

    }

    userLevel.textContent = level;

}

function saveUser(){

    localStorage.setItem(
    "currentScholarHubUser",
    JSON.stringify(currentUser)
);

}
/*====  DAILY LOGIN BONUSS=========*/

const today = new Date().toDateString();

if(currentUser.lastLogin !== today){

    currentUser.lastLogin = today;

    currentUser.learningXP += 5;

    currentUser.studyStreak += 1;

    saveUser();

}



loadProfile();


const toast = document.getElementById("toastNotification");
const toastText = document.getElementById("toastText");

function showToast(message){

    toastText.textContent = message;

    toast.classList.add("show");

    setTimeout(function(){

        toast.classList.remove("show");

    },3000);

}

/*=======UPDATE DASHBOARD============*/

function updateDashboard(){

    xpValue.textContent = currentUser.learningXP + " XP";

    progressText.textContent = currentUser.progress + "%";

    progressFill.style.width = currentUser.progress + "%";

    badgeValue.textContent = currentUser.badges + " Badges";

    streakValue.textContent = currentUser.studyStreak + " Day(s)";

    calculateLevel();

    saveUser();

}


function reward(action,xp,progress,badge){

    if(!currentUser.rewards){

        currentUser.rewards = {};

    }

    if(currentUser.rewards[action]){

        return false;

    }

    currentUser.rewards[action] = true;

    currentUser.learningXP += xp;

    currentUser.progress += progress;

    currentUser.badges += badge;

    if(currentUser.progress > 100){

        currentUser.progress = 100;

    }

    updateDashboard();

    return true;

}

/*=====================================
        AI ASSISTANT
======================================*/

document.getElementById("openAI").addEventListener("click",function(){

    if(typeof Tawk_API !== "undefined"){

        Tawk_API.maximize();

    }

    if(reward("aiAssistant",10,5,1)){

        showToast("🎉 AI Assistant Used! +10 XP");

    }

});

/*======STUDY MATERIALS==========*/

document.getElementById("openResources").addEventListener("click",function(){

    let pdf = "";

    if(currentUser.accountType === "Tutor"){

        pdf = "./pdf/Tutor-Guide.pdf";

    } else {

        switch(currentUser.category){

            case "JSS":
                pdf = "./pdf/JSS.pdf";
            break;

            case "SSS Science":
                pdf = "./pdf/SSS-Science.pdf";
            break;

            case "SSS Commercial":
                pdf = "./pdf/SSS-Commercial.pdf";
            break;

            case "SSS Arts":
                pdf = "./pdf/SSS-Arts.pdf";
            break;

            case "University":
                pdf = "./pdf/University.pdf";
            break;

            case "English Learner":
                pdf = "./pdf/English-Learners.pdf";
            break;

            default:
                pdf = "./pdf/JSS.pdf";
        }

    }

    localStorage.setItem("lastStudyMaterial","opened");

    window.open(pdf,"_blank");

});


window.addEventListener("focus",function(){

    if(localStorage.getItem("lastStudyMaterial") === "opened"){

        localStorage.removeItem("lastStudyMaterial");

        if(reward("studyMaterial",10,15,1)){

            showToast("📚 Study Material Completed! +10 XP");

        }

    }

});

/*======= COMMUNITY GROUP=========*/

document.getElementById("joinCommunity").addEventListener("click",function(){

    let link = "";

    if(currentUser.accountType === "Tutor"){

        link = "https://chat.whatsapp.com/L2IM97pZVED7BAkhrt2Xdd?s=cl&p=a&ilr=4";

    } else {

        switch(currentUser.category){

            case "JSS":
                link = "https://chat.whatsapp.com/Kss9alYUfKq6HccTtcbWhH?s=cl&p=a&ilr=4";
            break;

            case "SSS Science":
                link = "https://chat.whatsapp.com/DUV9PvB0O5lFL6DYnGiSkX?s=cl&p=a&ilr=4";
            break;

            case "SSS Commercial":
                link = "https://chat.whatsapp.com/JbqIAfk1peb022K3R3cKpF?s=cl&p=a&ilr=4";
            break;

            case "SSS Arts":
                link = "https://chat.whatsapp.com/ELtoAQKJvEn2ORK1T6Huz6?s=cl&p=a&ilr=4";
            break;

            case "University":
                link = "https://chat.whatsapp.com/HUEWHC1qkkBFaFkbGHQOlC?s=cl&p=a&ilr=4";
            break;

            case "English Learner":
                link = "https://chat.whatsapp.com/HyVHuk6e1zAIMVLz9RWao9?s=cl&p=a&ilr=4";
            break;

        }

    }

    if(link){

        window.open(link,"_blank");

    }

    if(reward("community",10,10,1)){

        showToast("👥 Community Joined! +10 XP");

    }

});
/*============ STUDY PARTNERS==============*/

const partners = {

    "JSS":[

        {name:"David James",phone:"+2348012345671"},

        {name:"Sarah Daniel",phone:"+2348098765432"},

        {name:"Michael John",phone:"+2348134567890"}

    ],

    "SSS Science":[

        {name:"Samuel Peter",phone:"+2348061112233"},

        {name:"Esther Grace",phone:"+2348132223344"},

        {name:"Daniel Moses",phone:"+2348145556677"}

    ],

    "SSS Commercial":[

        {name:"Ruth Johnson",phone:"+2348051234567"},

        {name:"Emmanuel Victor",phone:"+2348088884444"},

        {name:"Precious David",phone:"+2348117773333"}

    ],

    "SSS Arts":[

        {name:"Blessing Joy",phone:"+2348123456789"},

        {name:"Faith Samuel",phone:"+2348034567890"},

        {name:"Mercy Daniel",phone:"+2348165432198"}

    ],

    "University":[

        {name:"Joshua Emmanuel",phone:"+2348067891234"},

        {name:"Deborah Grace",phone:"+2348076543210"},

        {name:"Victor Paul",phone:"+2348182223344"}

    ],

    "English Learner":[

        {name:"Joy Williams",phone:"+2348171112233"},

        {name:"John Bright",phone:"+2348099998888"},

        {name:"Peace Michael",phone:"+2348156667777"}

    ],

    "Tutor":[

        {name:"Mr. Adewale",phone:"+2348032221111"},

        {name:"Mrs. Grace",phone:"+2348063334444"},

        {name:"Mr. Emmanuel",phone:"+2348095556666"}

    ]

};

/*== OPEN STUDY PARTNER=======*/

const partnersModal=document.getElementById("partnersModal");

const partnersContainer=document.getElementById("partnersContainer");

document.getElementById("findPartners").addEventListener("click",function(){

    partnersContainer.innerHTML="";

    const key = currentUser.accountType === "Tutor" ? "Tutor" : currentUser.category;

    const list = partners[key] || [];

    list.forEach(function(partner){

        partnersContainer.innerHTML += `

        <div class="partner-card">

            <h3>${partner.name}</h3>

            <p>${partner.phone}</p>

            <a href="https://wa.me/${partner.phone.replace(/\+/g,'')}"
               target="_blank"
               class="feature-btn">

                Message on WhatsApp

            </a>

        </div>

        `;

    });

    partnersModal.style.display="flex";

});

/*=====================================
        CLOSE PARTNERS MODAL
======================================*/

document.getElementById("closePartners").onclick=function(){

    partnersModal.style.display="none";

};

/*=====================================
        EDIT PROFILE
======================================*/

const editModal=document.getElementById("editProfileModal");

document.getElementById("editProfileBtn").onclick=function(){

    editModal.style.display="flex";

    document.getElementById("editName").value=currentUser.fullName;

    document.getElementById("editPhone").value=currentUser.phone;

    document.getElementById("editLocation").value=currentUser.location;

};

document.getElementById("closeEditModal").onclick=function(){

    editModal.style.display="none";

};

/*=========== SAVE PROFILE========*/

document.getElementById("editProfileForm").addEventListener("submit",function(e){

    e.preventDefault();

    currentUser.fullName=document.getElementById("editName").value;

    currentUser.phone=document.getElementById("editPhone").value;

    currentUser.location=document.getElementById("editLocation").value;

    const image=document.getElementById("editImage").files[0];

    if(image){

        const reader=new FileReader();

        reader.onload=function(){

            currentUser.profileImage=reader.result;

            saveUser();

            loadProfile();

        };

        reader.readAsDataURL(image);

    }else{

        saveUser();

        loadProfile();

    }

    editModal.style.display="none";

    showToast("✅ Profile Updated Successfully");

});

/*=====================================
        MOBILE SIDEBAR
======================================*/

const menuBtn=document.querySelector(".menu-btn");

const sidebar=document.querySelector(".sidebar");

const overlay=document.querySelector(".sidebar-overlay");

menuBtn.addEventListener("click",function(){

    sidebar.classList.add("active");

    overlay.classList.add("show");

});

overlay.addEventListener("click",function(){

    sidebar.classList.remove("active");

    overlay.classList.remove("show");

});

/*=====================================
        CLOSE MODALS
======================================*/

window.onclick=function(e){

    if(e.target===partnersModal){

        partnersModal.style.display="none";

    }

    if(e.target===editModal){

        editModal.style.display="none";

    }

};

updateDashboard();

loadProfile();
