// ========================================
// DOM Elements
// ========================================
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
const navbar = document.querySelector('.navbar');
const petalsContainer = document.getElementById('petals');
const regionBtns = document.querySelectorAll('.region-btn');
const productCards = document.querySelectorAll('.product-card');
const testimonialTrack = document.getElementById('testimonialTrack');
const sliderDots = document.getElementById('sliderDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// ========================================
// Mobile Menu Toggle
// ========================================
mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking links
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// ========================================
// Navbar Scroll Effect
// ========================================
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========================================
// Floating Petals Animation
// ========================================
function createPetal() {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    const petal = document.createElement('div');
    petal.className = 'petal';
    
    // Random properties
    const size = Math.random() * 10 + 8;
    const left = Math.random() * 100;
    const duration = Math.random() * 10 + 15;
    const delay = Math.random() * 5;
    const hue = Math.random() * 30 + 350; // Pink to coral range
    
    petal.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        background: hsl(${hue}, 50%, 75%);
        transform: rotate(${Math.random() * 360}deg);
    `;
    
    petalsContainer.appendChild(petal);
    
    // Remove petal after animation
    setTimeout(() => {
        petal.remove();
    }, (duration + delay) * 1000);
}

// Create initial petals
for (let i = 0; i < 15; i++) {
    setTimeout(createPetal, i * 300);
}

// Continue creating petals
setInterval(createPetal, 2000);

// ========================================
// Region Filter
// ========================================
regionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active state
        regionBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const region = btn.dataset.region;
        
        // Filter products
        productCards.forEach(card => {
            const cardRegions = card.dataset.region.split(' ');
            
            if (region === 'all' || cardRegions.includes(region)) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeIn 0.4s ease forwards';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ========================================
// Testimonial Slider
// ========================================
const testimonials = document.querySelectorAll('.testimonial-card');
let currentSlide = 0;
const totalSlides = testimonials.length;

// Create dots
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.className = `dot ${i === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(i));
    sliderDots.appendChild(dot);
}

function updateSlider() {
    testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update dots
    document.querySelectorAll('.slider-dots .dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Auto-advance slider
let sliderInterval = setInterval(nextSlide, 5000);

// Pause on hover
testimonialTrack.addEventListener('mouseenter', () => {
    clearInterval(sliderInterval);
});

testimonialTrack.addEventListener('mouseleave', () => {
    sliderInterval = setInterval(nextSlide, 5000);
});

// ========================================
// Scroll Reveal Animation
// ========================================
const revealElements = document.querySelectorAll('.reveal-up');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ========================================
// Add CSS Animation Keyframes via JS
// ========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ========================================
// Console Welcome Message
// ========================================
console.log('%c Zaidan Florist ', 'background: #c4726c; color: white; font-size: 20px; padding: 10px 20px; border-radius: 8px;');
console.log('%c Website by Florist Team ', 'color: #6b6560; font-size: 12px;');
