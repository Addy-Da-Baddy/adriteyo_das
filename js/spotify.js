// Spotify Currently Playing Feature
document.addEventListener('DOMContentLoaded', function() {
    const spotifyToken = 'BQAIjU0ILjU25WGe22OmH9a-RJ2wk9truvShXIEI2sJXNgh4B9vDQHl_7Gzcya46WBugYBvZLXilKIl4AmUWYukP57b4nPvktRB3wIL6_qouuzALHTkEkz2r22jleswFN___l5KCsqB5nv-UxRYljBh-82Mt4LNh0DTI14-NK4Yc9e6Ayge9JncNr_9FJbRgwWp_2K9eU44cETefnVKNm66vzrxvOdpw9FfRlmRUDzLDiWrG-0_0lqYBSzMvt7A1ip1Jf5ZkTTHOX6YxRY41DyP7wN2thbIVKouERJMoiL3KE2PvlQe6KhwYrnMMiwuu';

    // Create Spotify player container
    const createSpotifyPlayer = () => {
        const spotifyContainer = document.createElement('div');
        spotifyContainer.classList.add('spotify-container');
        
        const spotifyContent = `
            <div class="spotify-player">
                <div class="spotify-header">
                    <i class="fab fa-spotify"></i>
                    <span>currently playing</span>
                </div>
                <div class="spotify-content">
                    <div class="spotify-album-art">
                        <div class="spotify-disc"></div>
                        <img src="" alt="Album Art" id="spotify-album-img">
                    </div>
                    <div class="spotify-track-info">
                        <div class="spotify-track-name" id="spotify-track">Loading...</div>
                        <div class="spotify-artist-name" id="spotify-artist">Checking Spotify...</div>
                    </div>
                </div>
                <div class="spotify-progress">
                    <div class="spotify-progress-bar" id="spotify-progress"></div>
                </div>
            </div>
        `;
        
        spotifyContainer.innerHTML = spotifyContent;
        document.body.appendChild(spotifyContainer);
    };

    // Fetch currently playing song
    const fetchCurrentlyPlaying = () => {
        fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                'Authorization': `Bearer ${spotifyToken}`
            }
        })
        .then(response => {
            if (response.status === 204) {
                updatePlayerWithNoSong();
                return null;
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                updatePlayer(data);
            }
        })
        .catch(error => {
            console.error('Error fetching Spotify data:', error);
            updatePlayerWithError();
        });
    };

    // Update player with song data
    const updatePlayer = (data) => {
        if (!data.item) {
            updatePlayerWithNoSong();
            return;
        }

        const trackElement = document.getElementById('spotify-track');
        const artistElement = document.getElementById('spotify-artist');
        const albumImgElement = document.getElementById('spotify-album-img');
        const progressElement = document.getElementById('spotify-progress');
        
        // Update track and artist
        trackElement.textContent = data.item.name;
        artistElement.textContent = data.item.artists.map(artist => artist.name).join(', ');
        
        // Update album art
        if (data.item.album.images.length > 0) {
            albumImgElement.src = data.item.album.images[0].url;
        }
        
        // Update progress bar
        if (data.progress_ms && data.item.duration_ms) {
            const progressPercent = (data.progress_ms / data.item.duration_ms) * 100;
            progressElement.style.width = `${progressPercent}%`;
        }
        
        // Show the player
        document.querySelector('.spotify-container').classList.add('active');
    };

    // Update player when no song is playing
    const updatePlayerWithNoSong = () => {
        const trackElement = document.getElementById('spotify-track');
        const artistElement = document.getElementById('spotify-artist');
        const progressElement = document.getElementById('spotify-progress');
        
        trackElement.textContent = 'Not playing';
        artistElement.textContent = 'No track currently playing on Spotify';
        progressElement.style.width = '0%';
        
        // Show the player anyway
        document.querySelector('.spotify-container').classList.add('active');
    };

    // Update player when there's an error
    const updatePlayerWithError = () => {
        const trackElement = document.getElementById('spotify-track');
        const artistElement = document.getElementById('spotify-artist');
        const progressElement = document.getElementById('spotify-progress');
        
        trackElement.textContent = 'Connection error';
        artistElement.textContent = 'Could not connect to Spotify API';
        progressElement.style.width = '0%';
    };

    // Initialize spotify player
    createSpotifyPlayer();
    fetchCurrentlyPlaying();
    
    // Refresh every 30 seconds
    setInterval(fetchCurrentlyPlaying, 30000);
});
