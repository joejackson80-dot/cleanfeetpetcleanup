import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Quote Form Handler
const quoteForm = document.getElementById('quote-form');
const formMsg = document.getElementById('form-msg');

if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // In a real app, you'd use fetch() to send this to a backend
        // For now, we simulate a successful submission
        quoteForm.style.opacity = '0.5';
        quoteForm.querySelector('button').innerText = 'Sending...';
        
        setTimeout(() => {
            quoteForm.reset();
            quoteForm.style.opacity = '1';
            quoteForm.querySelector('button').innerText = 'Request Free Quote →';
            formMsg.style.display = 'block';
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMsg.style.display = 'none';
            }, 5000);
        }, 1500);
    });
}

// Contact Page Form Handler
const quoteFormPage = document.getElementById('quote-form-page');
const formMsgPage = document.getElementById('form-msg-page');

if (quoteFormPage) {
    quoteFormPage.addEventListener('submit', (e) => {
        e.preventDefault();
        
        quoteFormPage.style.opacity = '0.5';
        quoteFormPage.querySelector('button').innerText = 'Sending...';
        
        setTimeout(() => {
            quoteFormPage.reset();
            quoteFormPage.style.opacity = '1';
            quoteFormPage.querySelector('button').innerText = 'Send Quote Request →';
            formMsgPage.style.display = 'block';
            
            setTimeout(() => {
                formMsgPage.style.display = 'none';
            }, 5000);
        }, 1500);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});
