document.addEventListener('DOMContentLoaded', function() {
    // Initialize Binary Rain
    initBinaryRain();
    
    // Load vanilla-tilt.js for 3D card effects
    const tiltScript = document.createElement('script');
    tiltScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.7.0/vanilla-tilt.min.js';
    document.body.appendChild(tiltScript);
    
    tiltScript.onload = function() {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.3,
            gyroscope: false
        });
    };
    
    // Matrix animation for name hover
    function createMatrixEffect() {
        const nameElement = document.querySelector('.name');
        const matrixAnimation = document.createElement('div');
        matrixAnimation.classList.add('matrix-animation');
        nameElement.appendChild(matrixAnimation);
        
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$#@*%&{}[]><~";
        const numChars = 50;
        
        for (let i = 0; i < numChars; i++) {
            const char = document.createElement('div');
            char.classList.add('matrix-char');
            char.textContent = chars[Math.floor(Math.random() * chars.length)];
            char.style.left = `${Math.random() * 100}%`;
            char.style.animationDuration = `${1 + Math.random() * 2}s`;
            char.style.animationDelay = `${Math.random() * 2}s`;
            matrixAnimation.appendChild(char);
        }
    }
    
    createMatrixEffect();
    
    // Add hover effect to name with tryhard alias
    const nameElement = document.querySelector('.name');
    nameElement.addEventListener('mouseenter', () => {
        // Add more matrix characters for extra effect during hover
        const matrixAnimation = document.querySelector('.matrix-animation');
        if (matrixAnimation) {
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$#@*%&{}[]><~";
            for (let i = 0; i < 20; i++) {
                const char = document.createElement('div');
                char.classList.add('matrix-char');
                char.textContent = chars[Math.floor(Math.random() * chars.length)];
                char.style.left = `${Math.random() * 100}%`;
                char.style.animationDuration = `${0.5 + Math.random() * 1}s`;
                char.style.animationDelay = `${Math.random() * 0.5}s`;
                matrixAnimation.appendChild(char);
            }
        }
    });
    
    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;
    const icon = themeToggleBtn.querySelector('i');
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.replace('dark-theme', 'light-theme');
        icon.classList.replace('fa-moon', 'fa-sun');
    } else if (savedTheme === 'dark') {
        body.classList.replace('light-theme', 'dark-theme');
        icon.classList.replace('fa-sun', 'fa-moon');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        body.classList.replace('dark-theme', 'light-theme');
        icon.classList.replace('fa-moon', 'fa-sun');
    }
    
    // Create coding background animation
    function createCodeBackground() {
        const codeBackground = document.getElementById('code-background');
        if (!codeBackground) return;
        
        const codeLines = [
            'def detect_deepfake(image):',
            '    features = extract_features(image)',
            '    return model.predict(features)',
            'class AdversarialTrainer:',
            '    def __init__(self, model, alpha=0.01):',
            '        self.model = model',
            '        self.alpha = alpha',
            'async function fetchData() {',
            '    const response = await fetch(\'/api/data\')',
            '    return response.json()',
            '}',
            'for x in range(model.layers):',
            '    print(f"Layer {x}: {accuracy[x]:.2f}")',
            'class GAN(nn.Module):',
            '    def forward(self, x):',
            '        return self.generator(x)',
            'kubectl create -f deployment.yaml',
            'SELECT * FROM users WHERE role="admin"',
            'git commit -m "Fix security vulnerability"',
            'docker build -t ml-app .',
            'npm install --save react-router-dom'
        ];
        
        for (let i = 0; i < 15; i++) {
            const lineElement = document.createElement('div');
            lineElement.classList.add('code-line');
            lineElement.textContent = codeLines[Math.floor(Math.random() * codeLines.length)];
            
            // Random position
            lineElement.style.left = `${Math.random() * 100}%`;
            lineElement.style.top = `${Math.random() * 100}%`;
            
            // Random animation duration
            const duration = 5 + Math.random() * 15;
            lineElement.style.animationDuration = `${duration}s`;
            
            codeBackground.appendChild(lineElement);
        }
    }
    
    createCodeBackground();
    
    // Toggle theme
    themeToggleBtn.addEventListener('click', function() {
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Navigation active state
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    
    function setActiveNavLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 100)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinksContainer.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinksContainer.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Fixed Typing Animation
    const textArray = [
        "Deepfake Detection.",
        "xAI for Healthcare.",
        "Cyber Forensics.",
        "CTFs & AI Security."
    ];
    
    const typedTextElement = document.querySelector('.typed-text');
    console.log('Typed text element found:', typedTextElement);
    
    if (typedTextElement) {
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentText = textArray[textIndex];
            
            if (isDeleting) {
                typedTextElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            // Update data-text attribute for glitch effect
            typedTextElement.setAttribute('data-text', typedTextElement.textContent);
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textArray.length;
                typeSpeed = 500;
            }
            
            setTimeout(typeEffect, typeSpeed);
        }
        
        console.log('Starting typing animation...');
        // Start immediately
        typeEffect();
    } else {
        console.error('Typed text element not found - checking HTML structure');
        console.log('Available elements:', document.querySelectorAll('.terminal-typing *'));
    }
    
    // Syntax highlighting for code snippets
    function applySyntaxHighlighting() {
        const codeSnippets = document.querySelectorAll('.code-snippet code');
        
        codeSnippets.forEach(snippet => {
            const content = snippet.textContent;
            
            // Python keywords
            const pythonKeywords = ['def', 'class', 'if', 'else', 'elif', 'for', 'while', 'return', 'import', 'from', 'as', 'try', 'except', 'with', 'in', 'self', 'None', 'True', 'False'];
            
            // JavaScript keywords
            const jsKeywords = ['function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'return', 'new', 'this', 'async', 'await', 'import', 'export', 'class', 'extends', 'null', 'undefined', 'true', 'false'];
            
            // Functions
            const functionRegex = /\b(\w+)\(/g;
            
            // Comments
            const commentRegex = /(\/\/.*)|#.*/g;
            
            // Strings
            const stringRegex = /(['"`])(?:\\\1|.)*?\1/g;
            
            // Combine all keywords
            const allKeywords = [...pythonKeywords, ...jsKeywords];
            
            // Replace keywords, functions, strings, and comments
            let highlightedCode = content;
            
            // Replace strings
            highlightedCode = highlightedCode.replace(stringRegex, match => `<span class="string">${match}</span>`);
            
            // Replace keywords
            allKeywords.forEach(keyword => {
                const keywordRegex = new RegExp(`\\b${keyword}\\b`, 'g');
                highlightedCode = highlightedCode.replace(keywordRegex, match => `<span class="keyword">${match}</span>`);
            });
            
            // Replace functions
            highlightedCode = highlightedCode.replace(functionRegex, (match, funcName) => {
                return `<span class="function">${funcName}</span>(`;
            });
            
            // Replace comments
            highlightedCode = highlightedCode.replace(commentRegex, match => `<span class="comment">${match}</span>`);
            
            snippet.innerHTML = highlightedCode;
        });
    }
    
    // Apply syntax highlighting after a small delay
    setTimeout(applySyntaxHighlighting, 500);
    
    // Create more tech-themed animations
    function addMoreTechEffects() {
        // Add code characters randomly to tech-patterns
        const patterns = document.querySelectorAll('.tech-pattern');
        const codeChars = ['0', '1', '{', '}', '<', '>', '/', '*', '#', '$', '%', '&', '!', '@'];
        
        patterns.forEach(pattern => {
            for (let i = 0; i < 15; i++) {
                const codeChar = document.createElement('span');
                codeChar.textContent = codeChars[Math.floor(Math.random() * codeChars.length)];
                codeChar.style.position = 'absolute';
                codeChar.style.left = `${Math.random() * 100}%`;
                codeChar.style.top = `${Math.random() * 100}%`;
                codeChar.style.opacity = '0.2';
                codeChar.style.color = 'var(--accent)';
                codeChar.style.fontSize = `${Math.random() * 0.5 + 0.5}rem`;
                pattern.appendChild(codeChar);
            }
        });
        
        // Add scrolling line effect on hover to code snippets
        const codeSnippets = document.querySelectorAll('.code-snippet');
        codeSnippets.forEach(snippet => {
            snippet.addEventListener('mouseover', () => {
                const scrollLine = document.createElement('div');
                scrollLine.classList.add('code-scroll-line');
                scrollLine.style.position = 'absolute';
                scrollLine.style.height = '1px';
                scrollLine.style.width = '100%';
                scrollLine.style.backgroundColor = 'var(--accent)';
                scrollLine.style.opacity = '0.5';
                scrollLine.style.left = '0';
                scrollLine.style.top = '0';
                scrollLine.style.zIndex = '1';
                scrollLine.style.animation = 'scrollLine 2s linear infinite';
                snippet.appendChild(scrollLine);
                
                // Add animation to stylesheet if it doesn't exist
                if (!document.querySelector('#scrollLineAnimation')) {
                    const style = document.createElement('style');
                    style.id = 'scrollLineAnimation';
                    style.innerHTML = `
                        @keyframes scrollLine {
                            0% { top: 0; }
                            100% { top: 100%; }
                        }
                    `;
                    document.head.appendChild(style);
                }
            });
            
            snippet.addEventListener('mouseout', () => {
                const scrollLine = snippet.querySelector('.code-scroll-line');
                if (scrollLine) {
                    scrollLine.remove();
                }
            });
        });
    }
    
    // Call the function after DOM content is loaded
    addMoreTechEffects();
    
    // Scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe section elements
    document.querySelectorAll('section > .container').forEach(section => {
        observer.observe(section);
    });
    
    // Contact form handling with FormSubmit
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.querySelector('.response.success');
    const errorMessage = document.querySelector('.response.error');
    
    // Check for success parameter in URL (for form submission redirect)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('success')) {
        // Scroll to contact form
        document.getElementById('contact').scrollIntoView();
        
        // Show success message
        successMessage.classList.remove('hidden');
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 5000);
        
        // Remove success parameter from URL without reloading the page
        const newUrl = window.location.pathname;
        history.pushState({}, document.title, newUrl);
    }
    
    // Add loading state while the form is submitting
    contactForm.addEventListener('submit', function(e) {
        // We'll use this for the loading state only
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        // FormSubmit will handle form submission
        // No need to prevent default - let the form submit naturally
    });
    
    // Add staggered animations to new sections
    const newSectionsObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const newSectionsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add staggered animation delays
                if (element.classList.contains('skill-category')) {
                    const index = Array.from(element.parentElement.children).indexOf(element);
                    element.style.animationDelay = `${index * 0.1}s`;
                    element.classList.add('animate-in');
                }
                
                if (element.classList.contains('achievement-item')) {
                    const index = Array.from(element.parentElement.children).indexOf(element);
                    element.style.animationDelay = `${index * 0.2}s`;
                    element.classList.add('animate-in');
                }
                
                if (element.classList.contains('experience-item')) {
                    const index = Array.from(element.parentElement.children).indexOf(element);
                    element.style.animationDelay = `${index * 0.3}s`;
                    element.classList.add('animate-in');
                }
                
                newSectionsObserver.unobserve(element);
            }
        });
    }, newSectionsObserverOptions);

    // Observe all new section elements
    document.querySelectorAll('.skill-category, .achievement-item, .experience-item, .education-item').forEach(el => {
        newSectionsObserver.observe(el);
    });
    
    // Add floating effect to skill tags
    document.querySelectorAll('.skill-tag').forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.05}s`;
        
        // Add random float animation
        setInterval(() => {
            if (Math.random() > 0.7) {
                tag.style.transform = 'translateY(-2px)';
                setTimeout(() => {
                    tag.style.transform = 'translateY(0)';
                }, 300);
            }
        }, 2000 + Math.random() * 3000);
    });
    
    // Enhanced Matrix Effect for Background
    function createEnhancedMatrixEffect() {
        const matrixCanvas = document.createElement('canvas');
        matrixCanvas.id = 'matrix-canvas';
        matrixCanvas.style.position = 'fixed';
        matrixCanvas.style.top = '0';
        matrixCanvas.style.left = '0';
        matrixCanvas.style.width = '100%';
        matrixCanvas.style.height = '100%';
        matrixCanvas.style.zIndex = '-2';
        matrixCanvas.style.opacity = '0.1';
        document.body.appendChild(matrixCanvas);
        
        const ctx = matrixCanvas.getContext('2d');
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
        
        const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
        const fontSize = 14;
        const columns = matrixCanvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);
        
        function drawMatrix() {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
            ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
            
            ctx.fillStyle = '#00ff88';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(drawMatrix, 50);
        
        window.addEventListener('resize', () => {
            matrixCanvas.width = window.innerWidth;
            matrixCanvas.height = window.innerHeight;
        });
    }
    
    createEnhancedMatrixEffect();
    
    // Particle System for Hobbies Section
    function createParticleSystem() {
        const hobbiesSection = document.getElementById('hobbies');
        if (!hobbiesSection) return;
        
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.position = 'absolute';
        particleContainer.style.top = '0';
        particleContainer.style.left = '0';
        particleContainer.style.width = '100%';
        particleContainer.style.height = '100%';
        particleContainer.style.pointerEvents = 'none';
        particleContainer.style.overflow = 'hidden';
        
        hobbiesSection.style.position = 'relative';
        hobbiesSection.appendChild(particleContainer);
        
        function createParticle() {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '3px';
            particle.style.height = '3px';
            particle.style.background = '#00ff88';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = '100%';
            particle.style.opacity = '0.7';
            particle.style.animation = 'floatUp 4s linear forwards';
            
            particleContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 4000);
        }
        
        // Add CSS for float animation
        if (!document.querySelector('#floatUpAnimation')) {
            const style = document.createElement('style');
            style.id = 'floatUpAnimation';
            style.textContent = `
                @keyframes floatUp {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 0.7;
                    }
                    100% {
                        transform: translateY(-100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setInterval(createParticle, 500);
    }
    
    // Initialize particle system when hobbies section is visible
    const hobbiesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                createParticleSystem();
                hobbiesObserver.unobserve(entry.target);
            }
        });
    });
    
    const hobbiesSection = document.getElementById('hobbies');
    if (hobbiesSection) {
        hobbiesObserver.observe(hobbiesSection);
    }
    
    // Enhanced glitch effect for Cryptonite logo
    const cryptoniteLogo = document.querySelector('.cryptonite-logo');
    if (cryptoniteLogo) {
        setInterval(() => {
            if (Math.random() > 0.8) {
                cryptoniteLogo.style.filter = 'hue-rotate(180deg) saturate(2)';
                setTimeout(() => {
                    cryptoniteLogo.style.filter = 'none';
                }, 100);
            }
        }, 2000);
    }
});

// Binary Rain Effect
function initBinaryRain() {
    const binaryRain = document.getElementById('binary-rain');
    if (!binaryRain) return;
    
    const chars = '01';
    const columnCount = Math.floor(window.innerWidth / 20);
    
    function createBinaryColumn() {
        const column = document.createElement('div');
        column.style.position = 'absolute';
        column.style.left = Math.random() * window.innerWidth + 'px';
        column.style.top = '-100px';
        column.style.width = '20px';
        column.style.textAlign = 'center';
        
        const char = document.createElement('span');
        char.className = 'binary-char';
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        char.style.fontSize = (8 + Math.random() * 8) + 'px';
        char.style.opacity = Math.random() * 0.8 + 0.2;
        
        column.appendChild(char);
        binaryRain.appendChild(column);
        
        // Remove column after animation
        setTimeout(() => {
            if (column.parentNode) {
                column.parentNode.removeChild(column);
            }
        }, 15000);
    }
    
    // Create initial columns
    for (let i = 0; i < columnCount; i++) {
        setTimeout(createBinaryColumn, Math.random() * 5000);
    }
    
    // Continuously create new columns
    setInterval(createBinaryColumn, 200);
}

// Enhanced Glitch Effects with Color Flashes (Less Frequent)
function addRandomGlitches() {
    const elements = document.querySelectorAll('.skill-tag, .project-card h3, .section-header h2, .terminal-title');
    
    elements.forEach(element => {
        // Much more infrequent - only 10% chance
        if (Math.random() > 0.9) {
            const glitchType = Math.random();
            
            if (glitchType > 0.7) {
                // Intense glitch with color flashes
                element.style.animation = 'intense-glitch 0.8s ease-in-out';
            } else if (glitchType > 0.4) {
                // Color flash glitch
                element.style.animation = 'color-flash 0.4s ease-in-out';
            } else {
                // Regular glitch
                element.style.animation = 'glitch 0.3s ease-in-out';
            }
            
            setTimeout(() => {
                element.style.animation = '';
            }, 800);
        }
    });
}

// Trigger random glitches much less frequently
setInterval(addRandomGlitches, 15000); // Every 15 seconds instead of 8

// Add occasional screen flash effect
function screenFlash() {
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100vw';
    flash.style.height = '100vh';
    flash.style.backgroundColor = 'rgba(0, 255, 136, 0.1)';
    flash.style.zIndex = '9999';
    flash.style.pointerEvents = 'none';
    flash.style.animation = 'color-flash 0.2s ease-out';
    
    document.body.appendChild(flash);
    
    setTimeout(() => {
        document.body.removeChild(flash);
    }, 200);
}

// Rare screen flashes
setInterval(() => {
    if (Math.random() > 0.95) {
        screenFlash();
    }
}, 30000); // Check every 30 seconds

// Auto-glitch effect for section headings and hero name
function triggerAutoGlitch() {
    const glitchElements = document.querySelectorAll('.glitch-auto');
    
    glitchElements.forEach(element => {
        // Skip if element is already glitching
        if (element.classList.contains('glitch-active')) {
            return;
        }
        
        // Random chance for each element to glitch (much more frequent)
        if (Math.random() > 0.3) {
            element.classList.add('glitch-active');
            
            // Remove glitch effect after animation completes
            setTimeout(() => {
                element.classList.remove('glitch-active');
            }, 300);
        }
    });
}

// Trigger auto-glitch for headings every 1-3 seconds (very frequent)
function scheduleAutoGlitch() {
    const randomInterval = Math.random() * 2000 + 1000; // 1-3 seconds
    setTimeout(() => {
        triggerAutoGlitch();
        scheduleAutoGlitch(); // Schedule the next one
    }, randomInterval);
}

// Start the auto-glitch cycle
scheduleAutoGlitch();

// Special handling for hero name - more frequent glitches
function triggerHeroGlitch() {
    const heroName = document.querySelector('.name.glitch-auto');
    if (heroName && !heroName.classList.contains('glitch-active')) {
        heroName.classList.add('glitch-active');
        
        setTimeout(() => {
            heroName.classList.remove('glitch-active');
        }, 300);
    }
}

// Hero name glitches every 2-4 seconds (very frequent)
function scheduleHeroGlitch() {
    const randomInterval = Math.random() * 2000 + 2000; // 2-4 seconds
    setTimeout(() => {
        triggerHeroGlitch();
        scheduleHeroGlitch(); // Schedule the next one
    }, randomInterval);
}

// Start the hero glitch cycle
scheduleHeroGlitch();
