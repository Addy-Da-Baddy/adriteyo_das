// Rebellious Glitch Interruption System
document.addEventListener('DOMContentLoaded', function() {
    // Create the glitch overlay container
    const glitchOverlay = document.createElement('div');
    glitchOverlay.classList.add('glitch-overlay');
    document.body.appendChild(glitchOverlay);
    
    // Create scanline effect
    const scanlines = document.createElement('div');
    scanlines.classList.add('glitch-scanlines');
    glitchOverlay.appendChild(scanlines);
    
    // Create RGB shift layers
    const rgbShift = document.createElement('div');
    rgbShift.classList.add('rgb-shift');
    glitchOverlay.appendChild(rgbShift);
    
    // Create static noise overlay
    const noiseOverlay = document.createElement('div');
    noiseOverlay.classList.add('noise-static');
    glitchOverlay.appendChild(noiseOverlay);
    
    // Create the manifesto text container (full screen takeover)
    const manifestoContainer = document.createElement('div');
    manifestoContainer.classList.add('manifesto-container', 'full-screen-takeover');
    glitchOverlay.appendChild(manifestoContainer);
    
    // Prepare the manifesto text
    const manifestoText = `SYSTEM BREACH
    DIGITAL REBELLION IN PROGRESS
    CHALLENGING CONVENTIONS
    DEFYING BOUNDARIES
    REJECT THE ORDINARY
    EMBRACE THE GLITCH
    THIS IS NOT A BUG, IT'S A FEATURE
    [01100101 01111000 01110000 01101100 01101111 01110010 01100101]`;
    
    // Process the manifesto text and create animated characters
    const lines = manifestoText.split('\n').filter(line => line.trim().length > 0);
    
    lines.forEach((line, lineIndex) => {
        const lineElement = document.createElement('div');
        lineElement.classList.add('manifesto-line');
        
        // Add delay based on line index
        lineElement.style.animationDelay = `${lineIndex * 100}ms`;
        
        // Process each character in the line
        [...line.trim()].forEach((char, charIndex) => {
            const charSpan = document.createElement('span');
            charSpan.textContent = char;
            charSpan.style.animationDelay = `${charIndex * 15}ms`;
            lineElement.appendChild(charSpan);
        });
        
        manifestoContainer.appendChild(lineElement);
    });
    
    // Create a glitch audio element (optional)
    const glitchAudio = document.createElement('audio');
    glitchAudio.id = 'glitch-audio';
    glitchAudio.preload = 'auto';
    
    // Multiple sources for browser compatibility
    const audioSource1 = document.createElement('source');
    audioSource1.src = 'https://assets.codepen.io/955692/glitch-sound.mp3'; // Public domain sound or replace with your own
    audioSource1.type = 'audio/mpeg';
    
    glitchAudio.appendChild(audioSource1);
    document.body.appendChild(glitchAudio);
    
    // On first user interaction, trigger the glitch effect ONCE
    let glitchTriggered = false;
    function triggerGlitchOnceAfterInteraction() {
        if (!glitchTriggered) {
            glitchTriggered = true;
            triggerGlitch();
        }
    }
    
    // Function to trigger the glitch effect
    function triggerGlitch() {
        // For accessing in other scopes
        let colorFlash;
        
        // Store all current stylesheets in the page
        const stylesheets = Array.from(document.styleSheets);
        
        // Disable all stylesheets for 1 second - dramatic break
        stylesheets.forEach(sheet => {
            sheet.disabled = true;
        });
        
        // After 1 second, re-enable stylesheets and apply glitch effect
        setTimeout(() => {
            // Re-enable all stylesheets
            stylesheets.forEach(sheet => {
                sheet.disabled = false;
            });
            
            // Add active class to overlay
            glitchOverlay.classList.add('active');
            
            // Add extreme cyberpunk glitch class to body for website-wide effect
            document.body.classList.add('website-glitch');
        }, 1000);
        
        // Play audio (moved inside setTimeout to play after CSS is re-enabled)
        setTimeout(() => {
            const audio = document.getElementById('glitch-audio');
            if (audio) {
                audio.currentTime = 0;
                audio.volume = 0.4; // Slightly louder for more impact
                
                // Only play audio if user has interacted with the page
                if (document.documentElement.classList.contains('user-interacted')) {
                    const playPromise = audio.play();
                    
                    if (playPromise !== undefined) {
                        playPromise.catch(error => {
                            console.log("Auto-play prevented by browser", error);
                        });
                    }
                }
            }
        }, 1000);
        
        // Move all glitch effects inside the setTimeout to apply them after CSS is re-enabled
        setTimeout(() => {
            // Extreme glitch effects - affect almost all elements
            document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, img, div, span, a, button, section, nav, .text-row, .code-pattern').forEach(element => {
                if (Math.random() > 0.3) { // Increased probability
                    element.classList.add('glitch-displace');
                    
                    setTimeout(() => {
                        element.classList.remove('glitch-displace');
                    }, 1000 + Math.random() * 3000); // Longer and more random duration
                }
            });
            
            // Intensive RGB shift effect
            document.querySelectorAll('h1, h2, h3, h4, p, span, a, div, section, .text-row, .code-pattern').forEach(element => {
                if (Math.random() > 0.4) { // Increased probability
                    element.classList.add('text-glitch-rgb');
                    
                    setTimeout(() => {
                        element.classList.remove('text-glitch-rgb');
                    }, 1500 + Math.random() * 2500); // Longer and more random duration
                }
            });
            
            // Create random color flashes
            colorFlash = document.createElement('div');
            colorFlash.classList.add('color-flash');
            document.body.appendChild(colorFlash);
            
            // Add intensity to the manifesto container
            manifestoContainer.classList.add('intense');
        }, 1000);
        
        // Remove the glitch effect after 8 seconds total (7 seconds after re-enabling CSS)
        setTimeout(() => {
            glitchOverlay.classList.remove('active');
            document.body.classList.remove('website-glitch');
            if (colorFlash.parentNode) {
                colorFlash.parentNode.removeChild(colorFlash);
            }
            manifestoContainer.classList.remove('intense');
        }, 7000); // 7 seconds after re-enabling CSS = 8 seconds total
    }
    
    // Detect user interaction once for audio playback permissions
    function userInteractionHandler() {
        document.documentElement.classList.add('user-interacted');
        
        // Remove the event listeners once user has interacted
        document.removeEventListener('click', userInteractionHandler);
        document.removeEventListener('keydown', userInteractionHandler);
        document.removeEventListener('touchstart', userInteractionHandler);
    }
    
    // After DOMContentLoaded, wait for user interaction, then trigger glitch ONCE
    function onFirstInteraction() {
        triggerGlitchOnceAfterInteraction();
        document.removeEventListener('click', onFirstInteraction);
        document.removeEventListener('keydown', onFirstInteraction);
        document.removeEventListener('touchstart', onFirstInteraction);
    }
    document.addEventListener('click', onFirstInteraction);
    document.addEventListener('keydown', onFirstInteraction);
    document.addEventListener('touchstart', onFirstInteraction);
    
    // Add a keyboard shortcut to manually trigger the glitch effect (for testing)
    document.addEventListener('keydown', function(event) {
        // Ctrl + Shift + G
        if (event.ctrlKey && event.shiftKey && event.key === 'G') {
            triggerGlitch();
        }
    });
});
