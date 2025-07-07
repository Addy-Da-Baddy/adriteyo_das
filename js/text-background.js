// Text-based aesthetic background
document.addEventListener('DOMContentLoaded', function() {
    // Create the text background container
    const textBackground = document.createElement('div');
    textBackground.classList.add('text-background');
    document.body.appendChild(textBackground);
    
    // Create ASCII pattern overlay
    const asciiPattern = document.createElement('div');
    asciiPattern.classList.add('ascii-pattern');
    document.body.appendChild(asciiPattern);
    
    // Create binary rain container
    const binaryRain = document.createElement('div');
    binaryRain.classList.add('binary-rain');
    document.body.appendChild(binaryRain);
    
    // Initialize binary rain effect
    createBinaryRain(binaryRain);
    
    // Generate text layers
    createTextLayer(textBackground);
    
    // Add decorative code patterns
    addCodePatterns(textBackground);
    
    // Function to create a layer of text
    function createTextLayer(container) {
        const layer = document.createElement('div');
        layer.classList.add('text-layer');
        
        // Generate text content with code-like syntax
        const codeSnippets = [
            '/* code is art */',
            'function innovation() { return "progress"; }',
            'if (passion > skill) { growth = true; }',
            '// building the future one line at a time',
            'const thoughts = ["creative", "analytical", "innovative"];',
            'while (learning) { skills++; }',
            '/* debugging the world */',
            'for (let i = 0; i < Infinity; i++) { improve(); }',
            'class Human { constructor() { this.potential = Infinity; } }',
            '// TODO: change the world',
            'export const solutions = problems.map(solve);',
            'try { newIdeas(); } catch (fear) { tryAgain(); }',
            '/* thinking outside the terminal */',
            'import { inspiration } from "everyday_life";',
            'async function success() { await hardWork(); return results; }',
            '// persistence beats resistance',
            'let challenges = opportunities.filter(x => x.difficult);',
            'if (fail) { learn(); retry(); }',
            '/* crafting with keystrokes */'
        ];
        
        // Fill the container with rows of text
        const rowCount = Math.ceil(window.innerHeight / 24); // Approximate line height
        
        for (let i = 0; i < rowCount; i++) {
            const textRow = document.createElement('div');
            textRow.classList.add('text-row');
            
            // Randomly select a snippet and add some random spaces
            let snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
            let spaces = ' '.repeat(Math.floor(Math.random() * 20));
            
            // Add comment syntax to some lines
            if (Math.random() > 0.7) {
                snippet = `<span class="code-comment">${snippet}</span>`;
            }
            
            textRow.innerHTML = spaces + snippet;
            layer.appendChild(textRow);
        }
        
        container.appendChild(layer);
    }
    
    // Add decorative code patterns
    function addCodePatterns(container) {
        const patterns = [
            {
                class: 'pattern-1',
                text: 'function create() { return innovation; }'
            },
            {
                class: 'pattern-2',
                text: '/* code + creativity */'
            },
            {
                class: 'pattern-3',
                text: 'while(true) { learn(); grow(); }'
            },
            {
                class: 'pattern-4',
                text: '// future in progress'
            }
        ];
        
        patterns.forEach(pattern => {
            const patternElement = document.createElement('div');
            patternElement.classList.add('code-pattern', pattern.class);
            patternElement.textContent = pattern.text;
            container.appendChild(patternElement);
        });
    }
    
    // Create binary rain effect
    function createBinaryRain(container) {
        // Number of columns based on screen width - more columns for denser rain
        const columnCount = Math.floor(window.innerWidth / 15);
        
        for (let i = 0; i < columnCount; i++) {
            const column = document.createElement('div');
            column.classList.add('binary-column');
            
            // Random binary content (0s and 1s)
            const length = 15 + Math.floor(Math.random() * 25);
            let binaryContent = '';
            for (let j = 0; j < length; j++) {
                binaryContent += Math.random() > 0.5 ? '1' : '0';
            }
            column.textContent = binaryContent;
            
            // Enhanced random styling for more prominent binary rain
            column.style.left = `${(i / columnCount) * 100}%`;
            column.style.opacity = 0.3 + Math.random() * 0.5;
            column.style.animationDuration = `${2 + Math.random() * 8}s`; // Faster animation
            column.style.animationDelay = `${Math.random() * 15}s`;
            column.style.fontSize = `${Math.random() > 0.7 ? 1.8 : 1.2}rem`; // Larger text
            
            container.appendChild(column);
        }
    }
    
    // Responsive handling
    window.addEventListener('resize', () => {
        // Clear and regenerate text layer for proper sizing
        const textLayer = document.querySelector('.text-layer');
        if (textLayer) {
            textLayer.innerHTML = '';
            createTextLayer(textBackground);
        }
        
        // Regenerate binary rain
        const binaryRain = document.querySelector('.binary-rain');
        if (binaryRain) {
            binaryRain.innerHTML = '';
            createBinaryRain(binaryRain);
        }
    });
});
