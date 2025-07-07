// Audio Generator for Glitch Effect
document.addEventListener('DOMContentLoaded', function() {
    // Create audio context
    let audioContext;
    
    // Function to create the glitch sound
    function createGlitchSound() {
        // Create audio context on user interaction
        if (!audioContext) {
            try {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                console.error("Web Audio API is not supported in this browser");
                return;
            }
        }
        
        // Duration of the glitch sound
        const duration = 1.5;
        
        // Create buffer for the glitch sound
        const sampleRate = audioContext.sampleRate;
        const buffer = audioContext.createBuffer(2, sampleRate * duration, sampleRate);
        
        // Fill the buffer with noise
        for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
            // Get the raw audio data for the channel
            const data = buffer.getChannelData(channel);
            
            // Generate static noise with some digital glitches
            for (let i = 0; i < data.length; i++) {
                // Base noise
                let noise = Math.random() * 2 - 1;
                
                // Add some digital artifacts
                if (Math.random() > 0.999) {
                    // Digital spike
                    noise = Math.sign(noise);
                }
                
                // Add some rhythmic patterns
                if (Math.random() > 0.995) {
                    // Sudden silence
                    noise = 0;
                }
                
                // Add some frequency-based patterns
                if (i % (sampleRate / 50) < 5) {
                    // Click every 50Hz
                    noise *= 1.5;
                }
                
                // Envelope the sound to avoid clicks at start/end
                const envelope = Math.min(i / (sampleRate * 0.1), 1) * Math.min((buffer.length - i) / (sampleRate * 0.1), 1);
                
                // Apply the envelope
                data[i] = noise * 0.5 * envelope;
            }
        }
        
        // Create a buffer source node
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        
        // Create a gain node for volume control
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 0.2; // Lower volume
        
        // Create filters for more electronic sound
        const highpassFilter = audioContext.createBiquadFilter();
        highpassFilter.type = 'highpass';
        highpassFilter.frequency.value = 800;
        highpassFilter.Q.value = 1;
        
        const lowpassFilter = audioContext.createBiquadFilter();
        lowpassFilter.type = 'lowpass';
        lowpassFilter.frequency.value = 5000;
        lowpassFilter.Q.value = 1;
        
        // Create distortion
        const distortion = audioContext.createWaveShaper();
        function makeDistortionCurve(amount) {
            const k = amount;
            const n_samples = 44100;
            const curve = new Float32Array(n_samples);
            const deg = Math.PI / 180;
            
            for (let i = 0; i < n_samples; i++) {
                const x = i * 2 / n_samples - 1;
                curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
            }
            return curve;
        }
        distortion.curve = makeDistortionCurve(50);
        distortion.oversample = '4x';
        
        // Connect all nodes
        source.connect(distortion);
        distortion.connect(highpassFilter);
        highpassFilter.connect(lowpassFilter);
        lowpassFilter.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Return the source node
        return source;
    }
    
    // Function to play the glitch sound
    window.playGlitchSound = function() {
        // Check if user has interacted
        if (!document.documentElement.classList.contains('user-interacted')) {
            return;
        }
        
        try {
            const glitchSound = createGlitchSound();
            if (glitchSound) {
                glitchSound.start();
            }
        } catch (e) {
            console.error("Error playing glitch sound:", e);
        }
    };
});
