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

// PayPal Integration
const paymentModal = document.getElementById('payment-modal');
const closeModal = document.querySelector('.close-modal');
const paypalContainer = document.getElementById('paypal-button-container');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.querySelector('#modal-description span');

let currentPaypalInstance = null;

function openPaymentModal(planName, price) {
    if (paymentModal) {
        modalTitle.textContent = 'Complete Your Order';
        modalDesc.textContent = `${planName} - $${price}`;
        paymentModal.classList.add('active');
        renderPayPalButton(price, planName);
    }
}

function closePaymentModal() {
    if (paymentModal) {
        paymentModal.classList.remove('active');
        if (paypalContainer) paypalContainer.innerHTML = ''; // Clear for next time
    }
}

if (closeModal) {
    closeModal.addEventListener('click', closePaymentModal);
}

window.addEventListener('click', (e) => {
    if (e.target === paymentModal) closePaymentModal();
});

function renderPayPalButton(price, planName) {
    if (!window.paypal) {
        console.error('PayPal SDK not loaded');
        return;
    }

    if (paypalContainer) paypalContainer.innerHTML = '';

    window.paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    description: planName,
                    amount: {
                        currency_code: "USD",
                        value: price
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                // Show success in modal first
                modalTitle.textContent = 'Payment Successful!';
                modalDesc.textContent = 'Redirecting you to provide your service details...';
                paypalContainer.innerHTML = `
                    <div style="padding: 2rem; color: var(--secondary); text-align: center;">
                        <i class="fas fa-check-circle" style="font-size: 4rem; color: var(--primary); margin-bottom: 1.5rem;"></i>
                        <p style="font-size: 1.2rem; font-weight: 600;">Thank you, ${details.payer.name.given_name}!</p>
                        <p style="margin-top: 0.5rem; opacity: 0.8;">One moment while we redirect you...</p>
                    </div>
                `;
                
                // Redirect after 2 seconds
                setTimeout(() => {
                    window.location.href = `/contact.html?payment=success&name=${encodeURIComponent(details.payer.name.given_name)}&plan=${encodeURIComponent(planName)}`;
                }, 2500);
            });
        },
        onError: function(err) {
            console.error('PayPal Error:', err);
            alert('Something went wrong with the payment. Please try again.');
        }
    }).render('#paypal-button-container');
}

// Handle Payment Success Message on Contact Page
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('payment') === 'success') {
    const contactHeader = document.querySelector('.contact-hero h1') || document.querySelector('.section-title h2');
    const contactSub = document.querySelector('.contact-hero p') || document.querySelector('.section-title p');
    
    if (contactHeader) contactHeader.innerHTML = 'Payment <span>Received!</span>';
    if (contactSub) {
        contactSub.innerHTML = `<strong style="color: var(--primary); display: block; margin-bottom: 1rem; font-size: 1.2rem;">Thank you for your purchase!</strong> Please fill out the form below with your address and service details to complete your setup.`;
        contactSub.style.color = 'var(--secondary)';
    }

    // Scroll to form
    const form = document.getElementById('quote-form');
    if (form) {
        setTimeout(() => {
            form.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Highlight the form
            form.style.boxShadow = '0 0 30px rgba(106, 153, 78, 0.3)';
        }, 500);
    }
}

// Attach listeners to checkout buttons
document.querySelectorAll('.checkout-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const price = btn.getAttribute('data-price');
        const plan = btn.getAttribute('data-plan');
        openPaymentModal(plan, price);
    });
});
