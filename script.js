// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                // Reset hamburger animation
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('.testimonials-track');
  if (!track) return;

  const cards = Array.from(track.querySelectorAll('.testimonial-image'));

  // read the CSS gap so spacing stays correct
  const styles = getComputedStyle(track);
  const gap = parseFloat(styles.columnGap || styles.gap) || 16;

  // helper to measure current card width (responsive)
  function getCardWidth() {
    const first = cards[0];
    return first ? first.getBoundingClientRect().width : 0;
  }

  let index = 0;
  let autoTimer = null;

  function goTo(i) {
    const cardWidth = getCardWidth();
    const x = i * (cardWidth + gap);
    track.scrollTo({ left: x, behavior: 'smooth' });
    index = i;
  }

  function next() {
    index = (index + 1) % cards.length;
    goTo(index);
  }

  function startAuto() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(next, 4000); // every 4s
  }

  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = null;
  }

  // start
  startAuto();

  // pause on hover (desktop)
  track.addEventListener('mouseenter', stopAuto);
  track.addEventListener('mouseleave', startAuto);

  // pause while dragging/swiping (mobile)
  track.addEventListener('touchstart', stopAuto, { passive: true });
  track.addEventListener('touchend', startAuto);

  // keep alignment if viewport changes
  window.addEventListener('resize', () => goTo(index));
});



// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active navigation link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Testimonials Carousel Navigation
    const testimonialsTrack = document.querySelector('.testimonials-track');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');

    if (testimonialsTrack && testimonialPrev && testimonialNext) {
        const scrollAmount = 400;

        testimonialPrev.addEventListener('click', () => {
            testimonialsTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        testimonialNext.addEventListener('click', () => {
            testimonialsTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        testimonialsTrack.addEventListener('scroll', () => {
            const isAtStart = testimonialsTrack.scrollLeft <= 0;
            const isAtEnd = testimonialsTrack.scrollLeft >= testimonialsTrack.scrollWidth - testimonialsTrack.clientWidth;
            testimonialPrev.disabled = isAtStart;
            testimonialNext.disabled = isAtEnd;
        });

        testimonialPrev.disabled = true; // Initial state

        // Touch/swipe support for mobile
        let startX = 0;
        let currentX = 0;
        testimonialsTrack.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; });
        testimonialsTrack.addEventListener('touchmove', (e) => { currentX = e.touches[0].clientX; });
        testimonialsTrack.addEventListener('touchend', () => {
            const diffX = startX - currentX;
            const threshold = 50;
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) { testimonialsTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' }); }
                else { testimonialsTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' }); }
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
});

// Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
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

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.metric-card, .program-card, .support-card, .testimonial-card, .founder-content, .financial-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = 'var(--white)';
        header.style.backdropFilter = 'none';
    }
});

// Button click effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Counter animation for metrics
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.metric-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    };
    
    // Observe metric cards for counter animation
    const metricObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target.querySelector('.metric-number');
                if (counter) {
                    animateCounter(counter);
                    metricObserver.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.metric-card').forEach(card => {
        metricObserver.observe(card);
    });
});

// Form validation for contact forms (if any are added later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Add error styles
const errorStyle = document.createElement('style');
errorStyle.textContent = `
    .error {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
    }
    
    .error-message {
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
`;
document.head.appendChild(errorStyle);

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Header scroll effect (already implemented above)
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-green);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content landmark
    const mainContent = document.querySelector('.hero');
    if (mainContent) {
        mainContent.id = 'main-content';
        mainContent.setAttribute('role', 'main');
    }
});

// Timeline functionality
document.addEventListener('DOMContentLoaded', function() {
    const timelineTrack = document.querySelector('.timeline-track');
    const prevBtn = document.querySelector('.timeline-prev');
    const nextBtn = document.querySelector('.timeline-next');
    
    if (timelineTrack && prevBtn && nextBtn) {
        const scrollAmount = 300;
        
        prevBtn.addEventListener('click', () => {
            timelineTrack.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
        
        nextBtn.addEventListener('click', () => {
            timelineTrack.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Update button states based on scroll position
        timelineTrack.addEventListener('scroll', () => {
            const isAtStart = timelineTrack.scrollLeft <= 0;
            const isAtEnd = timelineTrack.scrollLeft >= timelineTrack.scrollWidth - timelineTrack.clientWidth;
            
            prevBtn.disabled = isAtStart;
            nextBtn.disabled = isAtEnd;
        });
        
        // Initialize button states
        prevBtn.disabled = true;
        
        // Touch/swipe support for mobile
        let startX = 0;
        let currentX = 0;
        
        timelineTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        timelineTrack.addEventListener('touchmove', (e) => {
            currentX = e.touches[0].clientX;
        });
        
        timelineTrack.addEventListener('touchend', () => {
            const diffX = startX - currentX;
            const threshold = 50;
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    // Swipe left - go next
                    timelineTrack.scrollBy({
                        left: scrollAmount,
                        behavior: 'smooth'
                    });
                } else {
                    // Swipe right - go previous
                    timelineTrack.scrollBy({
                        left: -scrollAmount,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
});

// Console welcome message
console.log('%c🚀 Welcome to SEGSALERTY! 🚀', 'color: #1a5f3c; font-size: 20px; font-weight: bold;');
console.log('%cNurturing Africa\'s Gifted Tech Talents', 'color: #4a7c59; font-size: 14px;'); 