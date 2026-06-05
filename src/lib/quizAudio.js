// Audio engine using nature sounds for the quiz

let bgAudio = null;
let isMuted = false;

// CDN-hosted sounds (Pixabay / public domain)
const SOUNDS = {
  // Upbeat, danceable background track
  background: "https://cdn.pixabay.com/audio/2024/02/28/audio_736db9c8cf.mp3",
  // Upbeat success chime
  correct: "https://cdn.pixabay.com/audio/2022/01/18/audio_ea1242e555.mp3",
  // Buzzer / fail sound
  wrong: "https://cdn.pixabay.com/audio/2021/08/04/audio_12b0c7443c.mp3",
  // Celebratory fanfare
  finish: "https://cdn.pixabay.com/audio/2022/01/18/audio_ea1242e555.mp3",
};

// Web Audio fallback synth (used if network audio fails)
let audioCtx = null;
function getCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}
function playTone(freq, type, duration, gainVal = 0.3, delay = 0) {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  osc.connect(gain);
  gain.connect(ctx.destination);
  const t = ctx.currentTime + delay;
  gain.gain.setValueAtTime(gainVal, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
  osc.start(t);
  osc.stop(t + duration);
}
function synthCorrect() {
  playTone(523.25, "sine", 0.15, 0.3);
  playTone(659.25, "sine", 0.15, 0.3, 0.1);
  playTone(783.99, "sine", 0.25, 0.3, 0.2);
}
function synthWrong() {
  playTone(220, "sawtooth", 0.12, 0.2);
  playTone(185, "sawtooth", 0.25, 0.2, 0.1);
}
function synthFinish() {
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
    playTone(f, "sine", 0.3, 0.25, i * 0.12)
  );
}

function playSfx(src, fallback) {
  if (isMuted) return;
  const audio = new Audio(src);
  audio.volume = 0.8;
  audio.play().catch(() => fallback && fallback());
}

export function startBackgroundMusic() {
  if (bgAudio) return;
  bgAudio = new Audio(SOUNDS.background);
  bgAudio.loop = true;
  bgAudio.volume = isMuted ? 0 : 0.4;
  bgAudio.play().catch(() => {});
}

export function stopBackgroundMusic() {
  if (bgAudio) {
    bgAudio.pause();
    bgAudio.currentTime = 0;
    bgAudio = null;
  }
}

export function setMuted(val) {
  isMuted = val;
  if (bgAudio) bgAudio.volume = val ? 0 : 0.4;
}

export function playCorrect() {
  playSfx(SOUNDS.correct, synthCorrect);
}

export function playWrong() {
  playSfx(SOUNDS.wrong, synthWrong);
}

export function playFinish() {
  playSfx(SOUNDS.finish, synthFinish);
}

export function resumeContext() {
  if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
}