// Enhanced interactive elements

// Interactive project cards with a "view details" popup
document.addEventListener('DOMContentLoaded', function() {
    // Interactive cursor trail effect
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    // Create cursor trail points
    for (let i = 0; i < 5; i++) {
        const trailPoint = document.createElement('div');
        trailPoint.classList.add('cursor-trail');
        trailPoint.style.setProperty('--delay', `${i * 0.05}s`);
        document.body.appendChild(trailPoint);
    }
    
    const trailPoints = document.querySelectorAll('.cursor-trail');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Move main cursor
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        
        // Move trail points with delay
        trailPoints.forEach((point, index) => {
            setTimeout(() => {
                point.style.left = mouseX + 'px';
                point.style.top = mouseY + 'px';
            }, index * 50);
        });
    });
    
    // Hide default cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .theme-toggle');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-interactive');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-interactive');
        });
    });
    
    // Typing effect for section headers
    const sectionHeaders = document.querySelectorAll('.section-header h2');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('typing-animation');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    sectionHeaders.forEach(header => {
        observer.observe(header);
    });
    
    // Random tech terms that float in the background
    const techTerms = [
        'neural-network',
        'csrf-token',
        'xss-payload',
        'entropy',
        'latent-space',
        'buffer-overflow',
        'zero-day',
        'adversarial',
        'ransomware',
        'transformer',
        'attention',
        'encryption',
        'quantum',
        'exploit'
    ];
    
    function createFloatingTechTerms() {
        const container = document.createElement('div');
        container.classList.add('floating-tech-terms');
        document.body.appendChild(container);
        
        for (let i = 0; i < 12; i++) {
            const term = document.createElement('span');
            term.classList.add('floating-term');
            term.textContent = techTerms[Math.floor(Math.random() * techTerms.length)];
            
            // Random positions
            term.style.left = `${Math.random() * 100}%`;
            term.style.top = `${Math.random() * 100}%`;
            term.style.opacity = (Math.random() * 0.2 + 0.05).toString();
            term.style.animationDuration = `${Math.random() * 100 + 50}s`;
            term.style.animationDelay = `-${Math.random() * 50}s`;
            
            container.appendChild(term);
        }
    }
    
    createFloatingTechTerms();
    
    // Add interactive form feedback
    const contactForm = document.getElementById('contact-form');
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const formGroup = input.closest('.form-group');
            formGroup.classList.add('active');
        });
        
        input.addEventListener('blur', () => {
            const formGroup = input.closest('.form-group');
            if (input.value === '') {
                formGroup.classList.remove('active');
            }
        });
    });
});

// Function to handle smooth scrolling with offset
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (!element) return;
    
    const headerHeight = document.querySelector('header').offsetHeight;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerHeight - 20;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}
