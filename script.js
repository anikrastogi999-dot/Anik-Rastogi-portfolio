const PROJECTS_STORAGE_KEY = "anik_portfolio_projects_v1";
const ADMIN_AUTH_KEY = "anik_admin_unlocked_v1";
const ADMIN_PIN = "1234"; // Change to your own PIN before deploying

const DEFAULT_PROJECTS = [
    {
        id: "wonderlust-app",
        title: "WONDERLUST",
        tag: "Full-Stack Web App",
        year: "2026",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        shortDescription: "Full-stack lodging and review web platform built with Node.js, Express, MongoDB, EJS, Passport.js authentication, and Joi validation.",
        fullDescription: "Wonderlust is a full-stack property listing and review application designed with modular MVC structure. It includes user authentication and session handling via Passport.js, request schema validation using Joi, dynamic templating with EJS and ejs-mate, and structured MongoDB data modeling for listings and user reviews.",
        highlights: [
            "User authentication & authorization using Passport.js",
            "Server-side payload validation with Joi schemas",
            "Listing creation, editing, deletion, and review system",
            "Responsive layout built with EJS templates & custom styling"
        ],
        techStack: ["Node.js", "Express.js", "MongoDB", "EJS", "Passport.js", "Joi"],
        liveUrl: "https://github.com/anikrastogi999-dot",
        githubUrl: "https://github.com/anikrastogi999-dot"
    },
    {
        id: "research-report-platform",
        title: "Multi-Sector Research Platform",
        tag: "React & Data App",
        year: "2026",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        shortDescription: "Multi-sector research report web application with React sector search filtering, authentication controls, and Google Sheets integration.",
        fullDescription: "A sector-focused research web application built with React that allows users to browse, search, and filter research reports across industries. It integrates authentication controls and pulls structured report data dynamically from Google Sheets so content stays easy to maintain.",
        highlights: [
            "Real-time sector search and category filtering in React",
            "Google Sheets data integration for structured report records",
            "Authentication gate & clean multi-view navigation"
        ],
        techStack: ["React", "JavaScript", "Google Sheets", "Authentication"],
        liveUrl: "https://github.com/anikrastogi999-dot",
        githubUrl: "https://github.com/anikrastogi999-dot"
    },
    {
        id: "ticket-seat-booking",
        title: "Ticket & Seat Booking System",
        tag: "Automation & Web",
        year: "2026",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
        shortDescription: "Seat and ticket booking web workflow featuring email OTP verification, Google Apps Script, Google Sheets storage, and QR entry confirmation.",
        fullDescription: "An end-to-end ticket and seat booking web application that verifies users via email OTP before confirming seat selections. Booking records are stored in Google Sheets via Google Apps Script endpoints and paired with QR-based entry confirmation.",
        highlights: [
            "Email OTP verification flow prior to booking confirmation",
            "Google Apps Script backend connected to Google Sheets",
            "QR-based pass/entry confirmation workflow"
        ],
        techStack: ["JavaScript", "Google Apps Script", "Google Sheets", "Email OTP", "QR Pass"],
        liveUrl: "https://github.com/anikrastogi999-dot",
        githubUrl: "https://github.com/anikrastogi999-dot"
    },
    {
        id: "zerodha-ui-clone",
        title: "Zerodha Trading UI Clone",
        tag: "Frontend Interface",
        year: "2026",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
        shortDescription: "React-based frontend interface inspired by Zerodha's clean brokerage layout, watchlists, and structured dashboard views.",
        fullDescription: "A responsive frontend clone built in React that recreates the structured layout, navigation hierarchy, and market-style dashboard sections of a modern trading platform.",
        highlights: [
            "Modular React component hierarchy",
            "Clean brokerage dashboard & section navigation",
            "Responsive styling across desktop and mobile viewports"
        ],
        techStack: ["React", "HTML5", "CSS3", "JavaScript"],
        liveUrl: "https://github.com/anikrastogi999-dot",
        githubUrl: "https://github.com/anikrastogi999-dot"
    }
];

function getProjects() {
    try {
        const raw = localStorage.getItem(PROJECTS_STORAGE_KEY);
        if (!raw) {
            localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
            return [...DEFAULT_PROJECTS];
        }
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) && parsed.length ? parsed : [...DEFAULT_PROJECTS];
    } catch {
        return [...DEFAULT_PROJECTS];
    }
}

function saveProjects(projects) {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
}

function escapeHtml(str = "") {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function sanitizeUrl(url = "") {
    const trimmed = String(url).trim();
    if (/^(https?:\/\/|\.\/|\/)/i.test(trimmed)) {
        return trimmed;
    }
    return "https://github.com/anikrastogi999-dot";
}

// Mobile Menu & Shortcut
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            menuToggle.classList.toggle("open");
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("open");
            });
        });
    }

    // Discreet keyboard shortcut to open private workspace
    document.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
            e.preventDefault();
            window.location.href = "admin.html";
        }
    });

    initTypingEffect();
    renderHomeProjects();
    renderProjectDetailPage();
    initAdminPage();
    initContactForm();
});

// Typing Effect in Hero
function initTypingEffect() {
    const el = document.getElementById("typingText");
    if (!el) return;

    const roles = [
        "Full Stack Web Developer",
        "MERN & Backend Builder",
        "Java DSA & Problem Solver",
        "BCA Software Developer"
    ];

    let roleIndex = 0;
    let charIndex = roles[0].length;
    let deleting = true;

    setInterval(() => {
        const currentRole = roles[roleIndex];

        if (!deleting) {
            charIndex++;
            el.textContent = currentRole.slice(0, charIndex);
            if (charIndex === currentRole.length) {
                deleting = true;
            }
        } else {
            charIndex--;
            el.textContent = currentRole.slice(0, Math.max(charIndex, 0));
            if (charIndex <= 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }
    }, 110);
}

// Render Projects on index.html
function renderHomeProjects() {
    const grid = document.getElementById("projectsGrid");
    if (!grid) return;

    const projects = getProjects();
    const countStat = document.getElementById("projectCountStat");
    if (countStat) {
        countStat.textContent = `${projects.length}+`;
    }

    grid.innerHTML = projects.map((proj) => {
        const detailHref = `project.html?id=${encodeURIComponent(proj.id)}`;
        const safeLive = sanitizeUrl(proj.liveUrl);
        const safeGithub = sanitizeUrl(proj.githubUrl);
        const safeImg = sanitizeUrl(proj.image);

        return `
            <article class="project-card">
                <a href="${detailHref}" class="project-img-wrapper">
                    <img src="${escapeHtml(safeImg)}" alt="${escapeHtml(proj.title)}" class="project-img">
                    <div class="project-overlay">
                        <span class="project-open-badge">Open Full Details <i class="fas fa-arrow-up-right-from-square"></i></span>
                    </div>
                </a>

                <div class="project-content">
                    <div class="project-meta">
                        <span class="project-tag">${escapeHtml(proj.tag)}</span>
                        <span class="project-year">${escapeHtml(proj.year)}</span>
                    </div>

                    <h3 class="project-title">
                        <a href="${detailHref}">${escapeHtml(proj.title)}</a>
                    </h3>

                    <p class="project-text">${escapeHtml(proj.shortDescription)}</p>

                    <div class="project-tech-stack">
                        ${(proj.techStack || []).map((t) => `<span>${escapeHtml(t)}</span>`).join("")}
                    </div>

                    <div class="project-card-actions">
                        <a href="${detailHref}" class="btn-card-detail">
                            <span>Full Details</span>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                        <div class="project-quick-icons">
                            <a href="${escapeHtml(safeLive)}" target="_blank" rel="noopener noreferrer" title="Open Live Project">
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                            <a href="${escapeHtml(safeGithub)}" target="_blank" rel="noopener noreferrer" title="View GitHub">
                                <i class="fab fa-github"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </article>
        `;
    }).join("");
}

// Render Dedicated Project Detail Page (project.html)
function renderProjectDetailPage() {
    const container = document.getElementById("projectDetailContainer");
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const projectId = params.get("id");
    const projects = getProjects();
    const project = projects.find((p) => p.id === projectId) || projects[0];

    if (!project) {
        container.innerHTML = `<div class="detail-box"><h2>Project not found</h2><a href="index.html#projects" class="btn-premium">Back to Projects</a></div>`;
        return;
    }

    document.title = `${project.title} | Anik Rastogi`;
    const safeLive = sanitizeUrl(project.liveUrl);
    const safeGithub = sanitizeUrl(project.githubUrl);
    const safeImg = sanitizeUrl(project.image);

    container.innerHTML = `
        <div class="detail-wrapper">
            <a href="index.html#projects" class="back-link">
                <i class="fas fa-arrow-left"></i> <span>Back to All Projects</span>
            </a>

            <div class="detail-hero-grid">
                <div class="detail-media-card">
                    <img src="${escapeHtml(safeImg)}" alt="${escapeHtml(project.title)}">
                </div>

                <div class="detail-meta-panel">
                    <div class="project-meta">
                        <span class="project-tag">${escapeHtml(project.tag)}</span>
                        <span class="project-year">${escapeHtml(project.year)}</span>
                    </div>

                    <h1 class="detail-title">${escapeHtml(project.title)}</h1>
                    <p class="detail-summary">${escapeHtml(project.shortDescription)}</p>

                    <div class="detail-tech-block">
                        <h4>Technologies Used</h4>
                        <div class="project-tech-stack">
                            ${(project.techStack || []).map((t) => `<span>${escapeHtml(t)}</span>`).join("")}
                        </div>
                    </div>

                    <div class="detail-cta-row">
                        <a href="${escapeHtml(safeLive)}" target="_blank" rel="noopener noreferrer" class="btn-submit-premium detail-live-btn">
                            <span>Open Live Project</span>
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                        <a href="${escapeHtml(safeGithub)}" target="_blank" rel="noopener noreferrer" class="btn-secondary-outline">
                            <i class="fab fa-github"></i> <span>Source Code</span>
                        </a>
                    </div>
                </div>
            </div>

            <div class="detail-body-grid">
                <div class="detail-card">
                    <h3>Project Overview & Architecture</h3>
                    <p>${escapeHtml(project.fullDescription || project.shortDescription)}</p>
                </div>

                <div class="detail-card">
                    <h3>Key Highlights</h3>
                    <ul class="detail-highlights">
                        ${(project.highlights && project.highlights.length
                            ? project.highlights
                            : ["Clean responsive architecture", "End-to-end feature implementation"]
                        ).map((item) => `<li><i class="fas fa-check-circle"></i> <span>${escapeHtml(item)}</span></li>`).join("")}
                    </ul>
                </div>
            </div>
        </div>
    `;
}

// Private Admin Page Logic (admin.html)
function initAdminPage() {
    const authBox = document.getElementById("adminAuthBox");
    const dashboard = document.getElementById("adminDashboard");
    const pinForm = document.getElementById("adminPinForm");
    const pinInput = document.getElementById("adminPinInput");
    const pinError = document.getElementById("pinError");
    const uploadForm = document.getElementById("uploadProjectForm");
    const listContainer = document.getElementById("adminProjectsList");
    const countEl = document.getElementById("adminProjectCount");
    const resetBtn = document.getElementById("resetDefaultProjectsBtn");
    const lockBtn = document.getElementById("lockAdminBtn");

    if (!authBox || !dashboard) return;

    const showDashboard = () => {
        authBox.style.display = "none";
        dashboard.style.display = "block";
        renderAdminProjectList();
    };

    const showLockScreen = () => {
        sessionStorage.removeItem(ADMIN_AUTH_KEY);
        dashboard.style.display = "none";
        authBox.style.display = "block";
        if (pinInput) pinInput.value = "";
    };

    if (sessionStorage.getItem(ADMIN_AUTH_KEY) === "true") {
        showDashboard();
    }

    pinForm?.addEventListener("submit", (e) => {
        e.preventDefault();
        if (pinInput.value === ADMIN_PIN) {
            sessionStorage.setItem(ADMIN_AUTH_KEY, "true");
            pinError.textContent = "";
            showDashboard();
        } else {
            pinError.textContent = "Invalid PIN. Please try again.";
        }
    });

    lockBtn?.addEventListener("click", showLockScreen);

    resetBtn?.addEventListener("click", () => {
        saveProjects([...DEFAULT_PROJECTS]);
        renderAdminProjectList();
    });

    uploadForm?.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.getElementById("projTitle").value.trim();
        const tag = document.getElementById("projTag").value.trim();
        const year = document.getElementById("projYear").value.trim() || "2026";
        const shortDescription = document.getElementById("projShortDesc").value.trim();
        const fullDescription = document.getElementById("projFullDesc").value.trim();
        const highlights = document.getElementById("projHighlights").value
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        const techStack = document.getElementById("projTech").value
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        const liveUrl = document.getElementById("projLiveUrl").value.trim();
        const githubUrl = document.getElementById("projGithubUrl").value.trim() || "https://github.com/anikrastogi999-dot";
        const image = document.getElementById("projImageUrl").value.trim() || DEFAULT_PROJECTS[0].image;

        const slugBase = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "project";
        const newProject = {
            id: `${slugBase}-${Date.now().toString().slice(-4)}`,
            title,
            tag,
            year,
            image,
            shortDescription,
            fullDescription,
            highlights,
            techStack,
            liveUrl,
            githubUrl
        };

        const current = getProjects();
        current.unshift(newProject);
        saveProjects(current);

        uploadForm.reset();
        document.getElementById("projYear").value = "2026";
        document.getElementById("projGithubUrl").value = "https://github.com/anikrastogi999-dot";
        document.getElementById("projImageUrl").value = DEFAULT_PROJECTS[0].image;

        const uploadStatus = document.getElementById("uploadStatus");
        if (uploadStatus) {
            uploadStatus.textContent = `"${title}" published to your portfolio!`;
        }

        renderAdminProjectList();
    });

    function renderAdminProjectList() {
        const projects = getProjects();
        if (countEl) countEl.textContent = String(projects.length);
        if (!listContainer) return;

        listContainer.innerHTML = projects.map((proj) => `
            <div class="admin-project-item">
                <div>
                    <h4>${escapeHtml(proj.title)}</h4>
                    <p>${escapeHtml(proj.tag)} • ${escapeHtml(proj.year)}</p>
                </div>
                <div class="admin-item-actions">
                    <a href="project.html?id=${encodeURIComponent(proj.id)}" class="btn-mini-link">Preview</a>
                    <button type="button" class="btn-mini-delete" data-delete-id="${escapeHtml(proj.id)}">Delete</button>
                </div>
            </div>
        `).join("");

        listContainer.querySelectorAll("[data-delete-id]").forEach((btn) => {
            btn.addEventListener("click", () => {
                const delId = btn.getAttribute("data-delete-id");
                const updated = getProjects().filter((p) => p.id !== delId);
                saveProjects(updated);
                renderAdminProjectList();
            });
        });
    }
}

// Contact Form Handler
function initContactForm() {
    const form = document.getElementById("premiumContactForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const statusEl = document.getElementById("contactStatus");
        if (statusEl) {
            statusEl.textContent = "Inquiry captured! Connect your EmailJS keys or backend endpoint to receive live emails.";
        }
        form.reset();
    });
}
