import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Quote Form Handler
const quoteForm = document.getElementById('quote-form');
const formSuccess = document.getElementById('form-success');

if (quoteForm && formSuccess) {
    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Hide form and show success message
        quoteForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // In a real app, you'd send the data here
        console.log('Form submitted successfully');
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
    });
});
// Hero Info Animation & Toggle
const heroContent = document.querySelector('.hero-content');
const heroToggle = document.getElementById('hero-info-toggle');

if (heroContent && heroToggle) {
    // Show the toggle button after the intro animation finishes (approx 8s)
    setTimeout(() => {
        heroToggle.classList.add('visible');
    }, 8000);

    heroToggle.addEventListener('click', () => {
        // Remove the CSS animation so it doesn't interfere with manual toggling
        heroContent.style.animation = 'none';
        
        const isHidden = heroContent.classList.contains('minimized');
        
        if (isHidden) {
            heroContent.classList.remove('minimized');
            heroContent.style.opacity = '1';
            heroContent.style.pointerEvents = 'auto';
            heroContent.style.transform = 'translateY(0)';
            heroToggle.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Info';
        } else {
            heroContent.classList.add('minimized');
            heroToggle.innerHTML = '<i class="fas fa-info-circle"></i> Show Pricing & Info';
        }
    });
}

