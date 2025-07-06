document.addEventListener('DOMContentLoaded', function() {
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
    
    // Typing Animation
    const textArray = [
        "Deepfake Detection.",
        "xAI for Healthcare.",
        "Cyber Forensics.",
        "CTFs & AI Security."
    ];
    
    const typedTextElement = document.querySelector('.typed-text');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentText = textArray[textIndex];
        
        if (isDeleting) {
            // Remove a character
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Add a character
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Typing speed
        let typeSpeed = isDeleting ? 50 : 100;
        
        // If word is complete, wait and then start deleting
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 1500; // Wait before starting to delete
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length; // Move to next text
            typeSpeed = 500; // Wait before typing next word
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start the typing animation
    setTimeout(typeEffect, 1000);
    
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
});
