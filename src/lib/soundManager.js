// Futuristic Digital UI Sound System for Fahri Xz Portfolio
// Powered by Web Audio API Synthesis with External Audio File Fallback

class SoundManager {
  constructor() {
    this.audioCtx = null;
    this.isEnabled = true;
    this.masterVolume = 0.15;
    this.clickVolume = 0.12;
    this.hoverVolume = 0.04;
    this.notificationVolume = 0.15;

    // Cooldown map to prevent duplicate sound stacking
    this.lastPlayed = {};
    this.cooldowns = {
      hover: 70, // ms
      click: 50,
      'nav-click': 60,
      'project-open': 120,
      launch: 150,
      close: 100,
      success: 150,
      error: 150,
      filter: 60,
      search: 60,
      fullscreen: 150,
      'fullscreen-exit': 150,
      'theme-toggle': 100,
      download: 150,
    };

    // Listeners for UI Visualizer animation
    this.listeners = new Set();
    this.isPlayingIndicator = false;

    // Load user preferences from localStorage
    this.initSettings();

    // Auto-unlock Web Audio on first user interaction (Mobile & Desktop)
    this.setupUnlockListeners();
  }

  initSettings() {
    if (typeof window === 'undefined') return;

    try {
      const savedEnabled = localStorage.getItem('fahrixz_sound_enabled');
      if (savedEnabled !== null) {
        this.isEnabled = savedEnabled === 'true';
      }

      const savedVolume = localStorage.getItem('fahrixz_sound_volume');
      if (savedVolume !== null) {
        const parsed = parseFloat(savedVolume);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 1) {
          this.masterVolume = parsed;
        }
      }

      // Check reduced motion preference
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced && savedEnabled === null) {
        // Slightly lower volume for reduced motion users
        this.masterVolume = 0.08;
      }
    } catch (e) {
      console.warn('LocalStorage error in SoundManager:', e);
    }
  }

  setupUnlockListeners() {
    if (typeof window === 'undefined') return;

    const unlock = () => {
      this.getAudioContext();
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      window.removeEventListener('click', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('pointerdown', unlock);
    };

    window.addEventListener('click', unlock, { passive: true, once: false });
    window.addEventListener('keydown', unlock, { passive: true, once: false });
    window.addEventListener('touchstart', unlock, { passive: true, once: false });
    window.addEventListener('pointerdown', unlock, { passive: true, once: false });
  }

  getAudioContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    return this.audioCtx;
  }

  toggleSound(enabled) {
    this.isEnabled = enabled !== undefined ? enabled : !this.isEnabled;
    try {
      localStorage.setItem('fahrixz_sound_enabled', String(this.isEnabled));
    } catch (e) {
      // ignore
    }
    this.notifyListeners();
    return this.isEnabled;
  }

  setVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    try {
      localStorage.setItem('fahrixz_sound_volume', String(this.masterVolume));
    } catch (e) {
      // ignore
    }
    this.notifyListeners();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notifyListeners() {
    this.listeners.forEach((fn) => fn(this.getSoundState()));
  }

  getSoundState() {
    return {
      isEnabled: this.isEnabled,
      masterVolume: this.masterVolume,
      isPlaying: this.isPlayingIndicator,
    };
  }

  triggerVisualizer() {
    this.isPlayingIndicator = true;
    this.notifyListeners();

    if (this.visualizerTimeout) clearTimeout(this.visualizerTimeout);
    this.visualizerTimeout = setTimeout(() => {
      this.isPlayingIndicator = false;
      this.notifyListeners();
    }, 180);
  }

  // Centralized Play Method
  play(soundName) {
    if (!this.isEnabled || this.masterVolume <= 0) return;

    // Check throttle / cooldown
    const now = Date.now();
    const cooldown = this.cooldowns[soundName] || 50;
    if (this.lastPlayed[soundName] && now - this.lastPlayed[soundName] < cooldown) {
      return;
    }
    this.lastPlayed[soundName] = now;

    const ctx = this.getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    this.triggerVisualizer();

    // Synthesize futuristic sound using Web Audio API
    try {
      this.synthesizeSound(soundName, ctx);
    } catch (e) {
      console.warn('Audio synthesis warning:', e);
    }
  }

  // Web Audio Synthesizer Engine (Futuristic Digital SFX)
  synthesizeSound(name, ctx) {
    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(this.masterVolume, now);
    masterGain.connect(ctx.destination);

    switch (name) {
      case 'click': {
        // Soft high digital micro-click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(900, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.025);

        gain.gain.setValueAtTime(this.clickVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.03);
        break;
      }

      case 'hover':
      case 'hover-soft': {
        // Ultra-soft subtle high blip
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);

        gain.gain.setValueAtTime(this.hoverVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.02);
        break;
      }

      case 'nav-click': {
        // Futuristic duo-tone rise blip
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(520, now);
        osc1.frequency.exponentialRampToValueAtTime(840, now + 0.04);

        gain1.gain.setValueAtTime(this.clickVolume * 0.9, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc1.connect(gain1);
        gain1.connect(masterGain);

        osc1.start(now);
        osc1.stop(now + 0.045);
        break;
      }

      case 'project-open': {
        // Ascending 3-tone digital chime
        const freqs = [440, 660, 880];
        freqs.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const startTime = now + i * 0.035;

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, startTime);

          gain.gain.setValueAtTime(0.08, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.08);

          osc.connect(gain);
          gain.connect(masterGain);

          osc.start(startTime);
          osc.stop(startTime + 0.085);
        });
        break;
      }

      case 'launch': {
        // Futuristic warp sweep
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(250, now);
        osc.frequency.exponentialRampToValueAtTime(1400, now + 0.09);

        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.095);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.1);
        break;
      }

      case 'close': {
        // Soft descending digital blip
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(750, now);
        osc.frequency.exponentialRampToValueAtTime(280, now + 0.05);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.055);
        break;
      }

      case 'fullscreen': {
        // Expanding sweep sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(960, now + 0.08);

        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.085);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.09);
        break;
      }

      case 'fullscreen-exit': {
        // Descending sweep
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(960, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.08);

        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.085);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.09);
        break;
      }

      case 'search': {
        // Soft double pulse
        [0, 0.04].forEach((delay, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const t = now + delay;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(800 + i * 200, t);

          gain.gain.setValueAtTime(0.06, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

          osc.connect(gain);
          gain.connect(masterGain);

          osc.start(t);
          osc.stop(t + 0.035);
        });
        break;
      }

      case 'filter': {
        // Tab switch click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1000, now + 0.03);

        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.04);
        break;
      }

      case 'success': {
        // Glassy triad chord chime (E5, G#5, B5)
        const chord = [659.25, 830.61, 987.77];
        chord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const t = now + idx * 0.04;

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, t);

          gain.gain.setValueAtTime(0.08, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

          osc.connect(gain);
          gain.connect(masterGain);

          osc.start(t);
          osc.stop(t + 0.13);
        });
        break;
      }

      case 'error': {
        // Gentle low dual beep
        [220, 180].forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.04, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

          osc.connect(gain);
          gain.connect(masterGain);

          osc.start(now);
          osc.stop(now + 0.095);
        });
        break;
      }

      case 'theme-toggle': {
        // Resonant pitch slide
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.exponentialRampToValueAtTime(1050, now + 0.07);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.075);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.08);
        break;
      }

      case 'download': {
        // Ascending confirmation
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const t = now + idx * 0.03;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t);

          gain.gain.setValueAtTime(0.07, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

          osc.connect(gain);
          gain.connect(masterGain);

          osc.start(t);
          osc.stop(t + 0.085);
        });
        break;
      }

      default: {
        // Fallback default click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(700, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.025);

        gain.gain.setValueAtTime(this.clickVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.03);
        break;
      }
    }
  }
}

export const soundManager = new SoundManager();
