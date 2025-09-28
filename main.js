// Navigation scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'var(--bg-white)';
        navbar.style.boxShadow = 'var(--shadow)';
    }
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', function() {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768 && navLinks) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Contact Form avec Formspree
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Afficher le loading
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        try {
            const formData = new FormData(this);
            
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showMessage('Thank you! Your message has been sent successfully.', 'success');
                this.reset();
            } else {
                throw new Error('Form submission failed');
            }
            
        } catch (error) {
            showMessage('Sorry, there was an error sending your message. Please try again or contact me directly at anouarasmoun8@gmail.com', 'error');
        } finally {
            // Réinitialiser le bouton
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.innerHTML = `
        <span>${message}</span>
        <button class="message-close">&times;</button>
    `;
    
    // Add styles for message
    const style = document.createElement('style');
    style.textContent = `
        .form-message {
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            color: white;
            font-weight: 500;
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 1rem;
            box-shadow: var(--shadow-lg);
            animation: slideInRight 0.3s ease;
        }
        
        .form-message.success {
            background: var(--accent-color);
        }
        
        .form-message.error {
            background: #ef4444;
        }
        
        .message-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(messageDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
    
    // Close button functionality
    messageDiv.querySelector('.message-close').addEventListener('click', () => {
        messageDiv.remove();
    });
}
// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});
// Enhanced skills background animation
function initSkillsAnimation() {
    const logos = document.querySelectorAll('.logo');
    
    logos.forEach((logo, index) => {
        // Randomize animation delays for more natural movement
        const randomDelay = Math.random() * 2;
        logo.style.animationDelay = `${randomDelay}s`;
        
        // Add interactivity
        logo.addEventListener('mouseenter', function() {
            this.style.opacity = '0.1';
            this.style.filter = 'grayscale(0%) brightness(1)';
            this.style.transform = 'scale(1.2)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.opacity = '0.03';
            this.style.filter = 'grayscale(100%) brightness(0.5)';
            this.style.transform = 'scale(1)';
        });
    });
}

// Initialize when skills section is in view
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            initSkillsAnimation();
        }
    });
});

// Observe skills section
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}