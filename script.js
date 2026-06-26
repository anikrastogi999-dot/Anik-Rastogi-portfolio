/* ==========================================================================
   1. TYPING EFFECT
   ========================================================================== */
const typingText = document.querySelector(".typing");

if (typingText) {
    const words = [
        "Full Stack Developer",
        "Frontend Developer",
        "Backend Developer",
        "MERN Stack Developer",
        "UI/UX Designer"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (!isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(typeEffect, 1500);
                return;
            }
        } else {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }

        setTimeout(typeEffect, isDeleting ? 60 : 120);
    }

    typeEffect();
}

/* ==========================================================================
   2. MOBILE MENU
   ========================================================================== */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });
}

/* ==========================================================================
   3. ABOUT ANIMATION
   ========================================================================== */
const aboutSection = document.querySelector(".about-container");

if (aboutSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.3 });

    observer.observe(aboutSection);
}

/* ==========================================================================
   4. TOAST NOTIFICATION
   ========================================================================== */
function showToast(msg, type = "success") {
    const existing = document.querySelector(".ar-toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = "ar-toast";

    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: ${type === "success" ? "#111" : "#1a0000"};
        color: ${type === "success" ? "#DFB76C" : "#ff6b6b"};
        border: 1px solid ${type === "success" ? "#DFB76C" : "#ff6b6b"};
        padding: 16px 24px;
        border-radius: 10px;
        font-size: 14px;
        font-family: 'Segoe UI', Arial, sans-serif;
        z-index: 99999;
        box-shadow: 0 8px 30px rgba(0,0,0,0.6);
        max-width: 340px;
        animation: arSlideIn 0.4s ease forwards;
    `;

    toast.textContent = msg;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.transition = "opacity 0.4s";
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

const toastStyle = document.createElement("style");
toastStyle.textContent = `
    @keyframes arSlideIn {
        from { transform: translateX(80px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(toastStyle);

/* ==========================================================================
   5. CONTACT FORM EMAILJS INTEGRATION
   ========================================================================== */
emailjs.init({
    publicKey: "sgZWhoGN9BdGjmlM8",
});

const contactForm = document.getElementById("premiumContactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const submitBtn = document.querySelector(".btn-submit-premium");

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>`;
        }

        try {
            await emailjs.sendForm(
                "service_wkdmgxg",
                "template_tg3ruvy",
                contactForm
            );

            showToast("✅ Project Inquiry Sent Successfully!", "success");
            contactForm.reset();
        } catch (error) {
            console.error("EmailJS Connectivity Error:", error);
            showToast("❌ Failed to send inquiry. Please try again.", "error");
        }

        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span>Send Project Inquiry</span> <i class="fas fa-paper-plane"></i>`;
        }
    });
}








document.querySelectorAll('.stat-value').forEach(el => {
  const target = parseFloat(el.getAttribute('data-target'));
  let count = 0;
  const speed = target / 50; 
  
  const updateCount = () => {
    if(count < target) {
      count += speed;
      el.innerText = target % 1 === 0 ? Math.floor(count) : count.toFixed(1);
      setTimeout(updateCount, 20);
    } else {
      el.innerText = el.getAttribute('data-target');
    }
  };
  updateCount();
});