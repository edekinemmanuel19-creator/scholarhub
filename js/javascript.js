"use strict";


const navbar = document.querySelector(".navbar");

const navLinks = document.querySelectorAll(".nav-links a");

const sections = document.querySelectorAll("section");


/*========  NAVBAR======*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});




function highlightNav() {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 140;

        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", highlightNav);




window.addEventListener("load", () => {

    if (window.scrollY > 60) {

        navbar.classList.add("scrolled");

    }

});
/*=======MOBILE MENU======*/

const menuToggle = document.querySelector(".menu-toggle");

const navMenu = document.querySelector(".nav-links");

if(menuToggle){

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if(navMenu.classList.contains("active")){

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        }else{

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });

}




navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        if(menuToggle){

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });

});




document.addEventListener("click", (e) => {

    if(

        navMenu.classList.contains("active") &&

        !navMenu.contains(e.target) &&

        !menuToggle.contains(e.target)

    ){

        navMenu.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

});




window.addEventListener("resize", () => {

    if(window.innerWidth > 992){

        navMenu.classList.remove("active");

        if(menuToggle){

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    }

});




navLinks.forEach(link => {

    link.addEventListener("click", function(e) {

        const targetId = this.getAttribute("href");

        if(targetId.startsWith("#")){

            e.preventDefault();

            const targetSection = document.querySelector(targetId);

            if(targetSection){

                window.scrollTo({

                    top: targetSection.offsetTop - 80,

                    behavior: "smooth"

                });

            }

        }

    });

});




const revealElements = document.querySelectorAll(

    ".section-header, .feature-card, .resource-card, .why-card, .step-card, .testimonial-card, .about-image, .about-content"

);

function revealOnScroll(){

    const windowHeight = window.innerHeight;

    revealElements.forEach(element => {

        const elementTop = element.getBoundingClientRect().top;

        if(elementTop < windowHeight - 100){

            element.classList.add("show");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

window.addEventListener("load", revealOnScroll);




const animatedCards = document.querySelectorAll(

    ".feature-card, .resource-card, .why-card, .step-card, .testimonial-card"

);

animatedCards.forEach((card, index) => {

    card.style.transitionDelay = `${index * 0.08}s`;

});




const buttons = document.querySelectorAll(
    ".btn-primary, .btn-secondary, .resource-btn"
);

buttons.forEach(button => {
    button.addEventListener("click", function(e){
        const circle = document.createElement("span");
        const diameter = Math.max(this.clientWidth, this.clientHeight);
        const radius = diameter / 2;
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - this.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${e.clientY - this.getBoundingClientRect().top - radius}px`;
        circle.classList.add("ripple");
        const ripple = this.querySelector(".ripple");
        if(ripple){
            ripple.remove();
        }
        this.appendChild(circle);
        circle.addEventListener("animationend", () => {
            circle.remove();
        });
    });
});

/*=====FAQ=====*/

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        const isActive = item.classList.contains("active");

        // Close all FAQ items
        faqItems.forEach(faq => {

            faq.classList.remove("active");

        });

        
        if (!isActive) {

            item.classList.add("active");

        }

    });

});




faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("keydown", (e) => {

        if (e.key === "Enter" || e.key === " ") {

            e.preventDefault();

            question.click();

        }

    });

});




window.addEventListener("load", () => {

    if (faqItems.length > 0) {

        faqItems[0].classList.add("active");

    }

});
/*=========  RESOURCE ======*/

const resourceButtons = document.querySelectorAll(".resource-btn");

const signupModal = document.getElementById("signupModal");

const closeModal = document.getElementById("closeModal");

const signupNow = document.getElementById("signupNow");

resourceButtons.forEach(button => {

    button.addEventListener("click", function(e){

        e.preventDefault();

        signupModal.classList.add("show");

        document.body.style.overflow = "hidden";

    });

});





window.addEventListener("click",(e)=>{

    if(e.target === signupModal){

        signupModal.classList.remove("show");

        document.body.style.overflow="auto";

    }

});



if (signupNow) {
    signupNow.addEventListener("click", () => {
        window.location.href = "signup.html";
    });
}



const counters = document.querySelectorAll(".counter");

const speed = 80;

function startCounters() {

    counters.forEach(counter => {

        const target = Number(counter.getAttribute("data-target"));

        let count = 0;

        const updateCounter = () => {

            const increment = Math.ceil(target / speed);

            if (count < target) {

                count += increment;

                if (count > target) count = target;

                counter.textContent = count.toLocaleString();

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent = target.toLocaleString();

            }

        };

        updateCounter();

    });

}

let counterStarted = false;

window.addEventListener("scroll", () => {

    const counterSection = document.querySelector(".statistics");

    if (!counterSection || counterStarted) return;

    const top = counterSection.getBoundingClientRect().top;

    if (top < window.innerHeight - 100) {

        counterStarted = true;

        startCounters();

    }

});




const heroImage = document.querySelector(".hero-image img");

window.addEventListener("mousemove", (e) => {

    if (!heroImage) return;

    const x = (window.innerWidth / 2 - e.clientX) / 45;

    const y = (window.innerHeight / 2 - e.clientY) / 45;

    heroImage.style.transform = `translate(${x}px, ${y}px)`;

});




if(heroImage){

    let floating = 0;

    setInterval(() => {

        floating += 0.05;

        heroImage.style.marginTop = `${Math.sin(floating) * 6}px`;

    },30);

}





const glowButtons = document.querySelectorAll(

    ".btn-primary, .resource-btn"

);

glowButtons.forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.boxShadow =

        "0 15px 35px rgba(37,99,235,.35)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.boxShadow = "";

    });

});


/*========  FEATURE======*/
const cards = document.querySelectorAll(

    ".feature-card"

);

cards.forEach(card => {

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateX = (rect.height / 2 - y) / 18;

        const rotateY = (x - rect.width / 2) / 18;

        card.style.transform =

        `perspective(1000px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-10px)`;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform = "";

    });

});



const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {

    if (!backToTop) return;

    if (window.scrollY > 400) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

if(backToTop){

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}




window.addEventListener("load", () => {

    const preloader = document.querySelector(".preloader");

    if(preloader){

        preloader.style.opacity = "0";

        setTimeout(() => {

            preloader.style.display = "none";

        },500);

    }

});




const progressBar = document.querySelector(".progress-bar");

window.addEventListener("scroll", () => {

    if(!progressBar) return;

    const scrollTop = document.documentElement.scrollTop;

    const scrollHeight =

        document.documentElement.scrollHeight -

        document.documentElement.clientHeight;

    const progress =

        (scrollTop / scrollHeight) * 100;

    progressBar.style.width = progress + "%";

});






window.onbeforeunload = function(){

    window.scrollTo(0,0);

};



document.documentElement.style.scrollBehavior = "smooth";




const lazyImages = document.querySelectorAll("img[data-src]");

if ("IntersectionObserver" in window) {

    const imageObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const img = entry.target;

                img.src = img.dataset.src;

                img.removeAttribute("data-src");

                observer.unobserve(img);

            }

        });

    });

    lazyImages.forEach(img => imageObserver.observe(img));

}




const yearElement = document.querySelector("#year");

if(yearElement){

    yearElement.textContent = new Date().getFullYear();

}




document.querySelectorAll('a[href="#"]').forEach(link => {

    link.addEventListener("click", e => {

        e.preventDefault();

    });

});





const allImages = document.querySelectorAll("img");

allImages.forEach(img => {

    img.onload = () => {

        img.classList.add("fade-in");

    };

});


/*====== CONSOLE MESSAGE======*/

console.log("%cWelcome to ScholarHub 🚀",
"color:#2563eb;font-size:18px;font-weight:bold;");

console.log(
"Developed with ❤️ using HTML, CSS and JavaScript."
);




window.addEventListener("load", () => {

    console.log("ScholarHub Loaded Successfully.");

});