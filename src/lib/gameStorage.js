const KEYS = {
  HIGH_SCORE: 'fruitquest_high_score',
  SFX_MUTED: 'fruitquest_sfx_muted',
};

export function getHighScore() {
  return parseInt(localStorage.getItem(KEYS.HIGH_SCORE) || '0', 10);
}

export function setHighScore(score) {
  const current = getHighScore();
  if (score > current) {
    localStorage.setItem(KEYS.HIGH_SCORE, score.toString());
    return true;
  }
  return false;
}

export function getSfxMuted() {
  return localStorage.getItem(KEYS.SFX_MUTED) === 'true';
}

export function setSfxMuted(val) {
  localStorage.setItem(KEYS.SFX_MUTED, val ? 'true' : 'false');
}
