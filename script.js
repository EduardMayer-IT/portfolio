// Navigation functionality
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll effect on navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Modal functionality
function showProjectDetails() {
    const modal = document.getElementById('projectDetailsModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeProjectDetails() {
    const modal = document.getElementById('projectDetailsModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('projectDetailsModal');
    if (e.target === modal) {
        closeProjectDetails();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProjectDetails();
    }
});

// Animate skill bars on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skills section
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    const skillCategories = skillsSection.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        observer.observe(category);
    });
}

// Animate stats on scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat-number, .project-stat-value');
            stats.forEach(stat => {
                animateValue(stat);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

function animateValue(element) {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const isTime = target.includes('s') || target.includes('<');
    const numericValue = parseFloat(target.replace(/[^\d.]/g, ''));
    
    if (isNaN(numericValue)) return;
    
    let current = 0;
    const increment = numericValue / 50;
    const duration = 1500;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            if (isPercentage) {
                element.textContent = Math.floor(current) + '%';
            } else if (isTime) {
                element.textContent = target.replace(/[\d.]+/, Math.floor(current).toString());
            } else {
                element.textContent = Math.floor(current).toString();
            }
        }
    }, stepTime);
}

// Observe stats sections
const aboutSection = document.getElementById('about');
const projectsSection = document.getElementById('projects');

if (aboutSection) {
    statsObserver.observe(aboutSection);
}

if (projectsSection) {
    statsObserver.observe(projectsSection);
}

// Add fade-in animation on scroll
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(section);
});

// Add active link highlighting
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    // Find the current active section
    let currentActiveSection = null;
    let currentActiveSectionTop = Infinity;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        // Check if this section is in view
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            // If no active section found yet, or this section is closer to the top of viewport
            if (!currentActiveSection || sectionTop < currentActiveSectionTop) {
                currentActiveSection = section;
                currentActiveSectionTop = sectionTop;
            }
        }
    });
    
    // Update nav links only once
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (currentActiveSection && link.getAttribute('href') === `#${currentActiveSection.getAttribute('id')}`) {
            link.classList.add('active');
        }
    });
    
    // If no section is in view (e.g., at the very top), activate the first link
    if (!currentActiveSection && scrollY < 100) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        if (navLinks.length > 0 && navLinks[0].getAttribute('href') === '#home') {
            navLinks[0].classList.add('active');
        }
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add active class to first nav link
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }
});

