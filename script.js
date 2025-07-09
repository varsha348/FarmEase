// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.style.display = 'none';
});

// Mobile Navigation
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.querySelector('i').classList.toggle('fa-bars');
    mobileMenu.querySelector('i').classList.toggle('fa-times');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Add parallax effect to welcome section
window.addEventListener('scroll', () => {
    const welcomeSection = document.querySelector('.welcome-section');
    if (welcomeSection) {
        const scrolled = window.pageYOffset;
        welcomeSection.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    } else {
        navbar.style.backgroundColor = '#ffffff';
        navbar.style.boxShadow = 'none';
    }
});

// Market card buttons
document.querySelectorAll('.market-btn').forEach(button => {
    button.addEventListener('click', function() {
        const action = this.textContent;
        alert(`${action} feature coming soon!`);
    });
});

// Storage booking buttons
document.querySelectorAll('.storage-btn').forEach(button => {
    button.addEventListener('click', function() {
        const facilityName = this.closest('.storage-card').querySelector('h3').textContent;
        alert(`Booking form for ${facilityName} will be available soon!`);
    });
});

// Get Started button
document.querySelector('.cta-button').addEventListener('click', function() {
    alert('Registration form coming soon! Stay tuned for updates.');
});

// Form validation for contact form
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! We will get back to you soon.');
        form.reset();
    });
});

// Add hover effects to marketplace cards
document.querySelectorAll('.market-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.animation = 'fadeIn 0.5s ease-in';
    });
});

// Static Weather Display
function updateWeather() {
    const weatherContainer = document.querySelector('.weather-container');
    if (!weatherContainer) return;

    const weatherHTML = `
        <div class="weather-card">
            <h3>Today's Weather</h3>
            <div class="weather-icon">
                <i class="fas fa-sun"></i>
            </div>
            <p class="temperature">28°C</p>
            <p class="condition">Sunny</p>
            <div class="weather-details">
                <p><i class="fas fa-tint"></i> Humidity: 65%</p>
                <p><i class="fas fa-wind"></i> Wind: 12 km/h</p>
            </div>
        </div>
        <div class="weather-card">
            <h3>Tomorrow's Forecast</h3>
            <div class="weather-icon">
                <i class="fas fa-cloud-sun"></i>
            </div>
            <p class="temperature">27°C</p>
            <p class="condition">Partly Cloudy</p>
            <div class="weather-details">
                <p><i class="fas fa-tint"></i> Humidity: 70%</p>
                <p><i class="fas fa-cloud-rain"></i> Rain Chance: 20%</p>
            </div>
        </div>
        <div class="weather-card farming-tips">
            <h3>Farming Tips</h3>
            <i class="fas fa-seedling"></i>
            <div class="recommendations">
                <p><i class="fas fa-check"></i> Good conditions for general farming activities</p>
                <p><i class="fas fa-check"></i> Water plants early morning or evening</p>
                <p><i class="fas fa-check"></i> Ideal time for crop maintenance</p>
            </div>
        </div>
    `;

    weatherContainer.innerHTML = weatherHTML;
}

// Update weather display when page loads
document.addEventListener('DOMContentLoaded', updateWeather);
