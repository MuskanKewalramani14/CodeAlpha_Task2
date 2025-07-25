const fileUpload = document.getElementById('fileUpload');
const playlistEl = document.getElementById('playlist');
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPause');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const volumeSlider = document.getElementById('volume');
const toggleTheme = document.getElementById('toggle-theme');

let playlist = [];
let currentTrackIndex = 0;
let isPlaying = false;

// Upload music files
fileUpload.addEventListener('change', (e) => {
  playlist = Array.from(e.target.files);
  renderPlaylist();
});

// Render playlist
function renderPlaylist() {
  playlistEl.innerHTML = '';
  playlist.forEach((track, index) => {
    const li = document.createElement('li');
    li.textContent = track.name;
    li.onclick = () => playTrack(index);
    playlistEl.appendChild(li);
  });
}

// Play selected track
function playTrack(index) {
  currentTrackIndex = index;
  const track = playlist[index];
  audio.src = URL.createObjectURL(track);
  audio.play();
  isPlaying = true;
  playPauseBtn.textContent = '⏸';
}

// Play/Pause
playPauseBtn.addEventListener('click', () => {
  if (!playlist.length) return;
  if (isPlaying) {
    audio.pause();
    playPauseBtn.textContent = '▶';
  } else {
    audio.play();
    playPauseBtn.textContent = '⏸';
  }
  isPlaying = !isPlaying;
});

// Next
nextBtn.addEventListener('click', () => {
  if (currentTrackIndex < playlist.length - 1) {
    playTrack(currentTrackIndex + 1);
  }
});

// Previous
prevBtn.addEventListener('click', () => {
  if (currentTrackIndex > 0) {
    playTrack(currentTrackIndex - 1);
  }
});

// Volume
volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

// Theme toggle
toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
function playTrack(index) {
  if (index < 0 || index >= playlist.length) return; // Prevent out of range

  currentTrackIndex = index;
  const track = playlist[index];
  audio.src = URL.createObjectURL(track);

  audio.onloadeddata = () => {
    audio.play();
    isPlaying = true;
    playPauseBtn.textContent = '⏸';
  };
}
