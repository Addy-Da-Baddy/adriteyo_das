// Music Player for local mp3s (cyber/terminal theme)
document.addEventListener('DOMContentLoaded', function() {
    // Hardcoded list of mp3s in /music
    const songs = [
        '[SPOTDOWNLOADER.COM] Mambo No. 5 (a Little Bit of...).mp3',
        '[SPOTDOWNLOADER.COM] Everlong.mp3',
        '[SPOTDOWNLOADER.COM] Fluorescent Adolescent.mp3',
        '[SPOTDOWNLOADER.COM] You\'re a God.mp3',
        '[SPOTDOWNLOADER.COM] Alive.mp3',
        '[SPOTDOWNLOADER.COM] No Excuses.mp3',
        '[SPOTDOWNLOADER.COM] Pinch Me.mp3',
        '[SPOTDOWNLOADER.COM] Here Comes Your Man.mp3',
        '[SPOTDOWNLOADER.COM] Every Little Thing She Does Is Magic.mp3',
        '[SPOTDOWNLOADER.COM] I Gotta Feeling.mp3',
        '[SPOTDOWNLOADER.COM] Wonderwall - Remastered.mp3',
        '[SPOTDOWNLOADER.COM] Every Breath You Take.mp3',
        '[SPOTDOWNLOADER.COM] Dream On.mp3',
        '[SPOTDOWNLOADER.COM] Sweet Home Alabama.mp3',
        '[SPOTDOWNLOADER.COM] Sultans Of Swing.mp3',
        '[SPOTDOWNLOADER.COM] Summer Of \'69.mp3',
        '[SPOTDOWNLOADER.COM] Walking On A Dream.mp3',
        '[SPOTDOWNLOADER.COM] Hey Jude.mp3',
        '[SPOTDOWNLOADER.COM] Hotel California - 2013 Remaster.mp3',
        '[SPOTDOWNLOADER.COM] Creep.mp3',
        '[SPOTDOWNLOADER.COM] Staring At The Sun.mp3',
        '[SPOTDOWNLOADER.COM] Californication.mp3',
        '[SPOTDOWNLOADER.COM] Losing My Religion.mp3',
        '[SPOTDOWNLOADER.COM] One Headlight.mp3',
    ];
    function getRandomSong() {
        return songs[Math.floor(Math.random() * songs.length)];
    }
    const playerDiv = document.getElementById('music-player');
    if (!playerDiv) return;
    let currentSong = getRandomSong();
    let isExpanded = false;
    playerDiv.className = 'cyber-music-player';
    function cleanSongName(filename) {
        return filename.replace(/^\[SPOTDOWNLOADER\.COM\] /, '').replace(/\.[^/.]+$/, '');
    }
    playerDiv.innerHTML = `
        <div class="cmp-bar" id="cmp-bar">
            <span class="cmp-song" id="cmp-song">🎵 ${cleanSongName(currentSong)}</span>
            <button class="cmp-next" id="cmp-next" title="Next Song">⏭️</button>
            <button class="cmp-playpause" id="cmp-playpause" title="Play/Pause">⏸️</button>
        </div>
        <audio id="cmp-audio" src="music/${currentSong}" preload="auto"></audio>
        <div class="cmp-ipod" id="cmp-ipod" style="display:none;"></div>
    `;
    const audio = playerDiv.querySelector('#cmp-audio');
    const playPauseBtn = playerDiv.querySelector('#cmp-playpause');
    const nextBtn = playerDiv.querySelector('#cmp-next');
    const songSpan = playerDiv.querySelector('#cmp-song');
    const cmpBar = playerDiv.querySelector('#cmp-bar');
    const cmpIpod = playerDiv.querySelector('#cmp-ipod');
    function playSong(song) {
        audio.src = `music/${song}`;
        songSpan.textContent = `🎵 ${cleanSongName(song)}`;
        audio.play();
        playPauseBtn.textContent = '⏸️';
    }
    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = '⏸️';
        } else {
            audio.pause();
            playPauseBtn.textContent = '▶️';
        }
    });
    nextBtn.addEventListener('click', () => {
        currentSong = getRandomSong();
        playSong(currentSong);
    });
    audio.addEventListener('ended', () => {
        currentSong = getRandomSong();
        playSong(currentSong);
    });
    cmpBar.addEventListener('click', () => {
        isExpanded = !isExpanded;
        cmpIpod.style.display = isExpanded ? 'block' : 'none';
        if (isExpanded) {
            cmpIpod.innerHTML = `
                <div class="cmp-ipod-ui">
                    <div class="cmp-ipod-screen">
                        <span class="cmp-ipod-song">${cleanSongName(currentSong)}</span>
                    </div>
                    <div class="cmp-ipod-controls">
                        <button id="ipod-prev">⏮️</button>
                        <button id="ipod-play">${audio.paused ? '▶️' : '⏸️'}</button>
                        <button id="ipod-next">⏭️</button>
                    </div>
                </div>
            `;
            cmpIpod.querySelector('#ipod-play').onclick = () => {
                if (audio.paused) {
                    audio.play();
                    cmpIpod.querySelector('#ipod-play').textContent = '⏸️';
                    playPauseBtn.textContent = '⏸️';
                } else {
                    audio.pause();
                    cmpIpod.querySelector('#ipod-play').textContent = '▶️';
                    playPauseBtn.textContent = '▶️';
                }
            };
            cmpIpod.querySelector('#ipod-next').onclick = () => {
                currentSong = getRandomSong();
                playSong(currentSong);
                cmpIpod.querySelector('.cmp-ipod-song').textContent = cleanSongName(currentSong);
            };
            cmpIpod.querySelector('#ipod-prev').onclick = () => {
                // No previous, just random for now
                currentSong = getRandomSong();
                playSong(currentSong);
                cmpIpod.querySelector('.cmp-ipod-song').textContent = cleanSongName(currentSong);
            };
        }
    });
    // Start playing on load
    playSong(currentSong);
}); 