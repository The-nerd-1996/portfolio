// script.js

// =================== DOM Elements ===================
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn'); // <-- button element

// =================== Navbar scroll effect ===================
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#fff';
        navbar.style.backdropFilter = 'none';
    }
});

// =================== Mobile menu toggle ===================
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// =================== Typing effect ===================
const typedTextSpan = document.getElementById('typed-text');
const textArray = ["Software Developer", "Web Developer", "Problem Solver", "Tech Enthusiast"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 1500;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1000);
    }
}

// Initialize typing effect when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// =================== Skill bars animation ===================
function animateSkillBars() {
    skillProgressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

const skillsSection = document.querySelector('.skills');
const observerOptions = {
    root: null,
    threshold: 0.3,
    rootMargin: '0px'
};

const skillsObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

skillsObserver.observe(skillsSection);

// =================== Smooth scrolling ===================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// =================== EmailJS Integration ===================
// Init EmailJS
emailjs.init("Ubv1yO8k1ZYZuCNuu"); // Replace with your EmailJS Public Key

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
        showFormMessage("⚠️ Please fill in all fields.", "error");
        return;
    }

    // Loading state
    const btnText = submitBtn.querySelector('.btn-text');
    const loadingSpinner = submitBtn.querySelector('.loading-spinner');
    btnText.style.display = 'none';
    loadingSpinner.style.display = 'inline-block';
    submitBtn.disabled = true;

    try {
        await emailjs.sendForm('service_m3vvfdq', 'template_sc6tx2y', contactForm);
        showFormMessage("✅ Thank you for your message! I'll get back to you soon.", "success");
        contactForm.reset();
    } catch (error) {
        console.error("EmailJS error:", error);
        showFormMessage("❌ Sorry, there was an error sending your message. Please try again.", "error");
    } finally {
        // Reset button state
        btnText.style.display = 'inline';
        loadingSpinner.style.display = 'none';
        submitBtn.disabled = false;
    }
});

// =================== Helper: Show Message ===================
function showFormMessage(message, type) {
    let msgBox = document.getElementById("formMessage");
    if (!msgBox) {
        msgBox = document.createElement("div");
        msgBox.id = "formMessage";
        msgBox.style.marginTop = "10px";
        msgBox.style.fontWeight = "500";
        msgBox.style.transition = "opacity 0.5s ease"; // smooth fade
        contactForm.appendChild(msgBox);
    }
    msgBox.textContent = message;
    msgBox.style.color = (type === "success") ? "green" : "red";
    msgBox.style.opacity = "1"; // show fully

    // Fade out after 5 seconds
    setTimeout(() => {
        msgBox.style.opacity = "0";
        // Clear text after fade completes (0.5s)
        setTimeout(() => {
            msgBox.textContent = "";
        }, 500);
    }, 5000);
}


