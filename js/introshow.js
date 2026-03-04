/**
 * SiMia World — IntroShow Unity WebGL Integration
 * Replaces the placeholder spinning cube (webgl.js) with an actual
 * Unity WebGL build that renders 3D characters dancing to music.
 *
 * The Unity build communicates via IntroShowBridge.jslib callbacks.
 */

const IntroShowWebGL = (() => {
  let unityInstance = null;
  let running = false;
  let paused = false;
  let ready = false;
  let pendingConfig = null;

  // Path to the Unity WebGL build output
  // Update this after building from Unity
  const BUILD_PATH = 'builds/intro-show';
  const LOADER_SCRIPT = BUILD_PATH + '/Build/intro-show.loader.js';
  const BUILD_CONFIG = {
    dataUrl:      BUILD_PATH + '/Build/intro-show.data',
    frameworkUrl:  BUILD_PATH + '/Build/intro-show.framework.js',
    codeUrl:       BUILD_PATH + '/Build/intro-show.wasm',
    streamingAssetsUrl: BUILD_PATH + '/StreamingAssets',
    companyName:   'Simia',
    productName:   'IntroShow',
    productVersion: '0.1.0',
  };

  // ── Unity → Web App callbacks ──────────────────────

  // Progress callback — update the player's progress bar
  window.onIntroShowProgress = function(currentTime, totalDuration) {
    if (totalDuration <= 0) return;
    const pct = Math.min(100, (currentTime / totalDuration) * 100);

    const fill = document.getElementById('progress-fill');
    if (fill) fill.style.width = pct + '%';

    const scrubber = document.getElementById('player-scrubber');
    if (scrubber) scrubber.style.left = pct + '%';

    const currentEl = document.getElementById('current-time');
    if (currentEl) currentEl.textContent = formatTime(Math.floor(currentTime));

    const totalEl = document.getElementById('total-time');
    if (totalEl) totalEl.textContent = formatTime(Math.floor(totalDuration));
  };

  // Completion callback — show is done playing
  window.onIntroShowComplete = function() {
    console.log('[IntroShow] Show complete');
    running = false;
    paused = false;

    const playIcon = document.getElementById('play-pause-icon');
    if (playIcon) playIcon.src = 'assets/graphics/Icon_Play.png';
  };

  // Ready callback — Unity has loaded and scene is ready
  // Guard: only send pendingConfig once to prevent Initialize→OnReady→sendConfig loop
  let initialConfigSent = false;
  window.onIntroShowReady = function() {
    console.log('[IntroShow] Unity scene ready');
    ready = true;

    // If we queued a config before Unity was ready, send it now (once only)
    if (pendingConfig && !initialConfigSent) {
      initialConfigSent = true;
      sendConfig(pendingConfig);
      pendingConfig = null;
    }
  };

  // ── Helpers ────────────────────────────────────────

  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m + ':' + s.toString().padStart(2, '0');
  }

  function sendConfig(config) {
    if (!unityInstance) {
      console.warn('[IntroShow] No Unity instance, queuing config');
      pendingConfig = config;
      return;
    }

    const json = JSON.stringify(config);
    unityInstance.SendMessage('IntroShowManager', 'Initialize', json);
  }

  // ── Load Unity WebGL Build ─────────────────────────

  async function loadUnity() {
    if (unityInstance) return; // Already loaded

    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) {
      console.error('[IntroShow] webgl-canvas element not found');
      return;
    }

    // Show the canvas
    canvas.classList.add('active');

    // Check if the Unity loader script is already on the page
    if (typeof createUnityInstance === 'undefined') {
      // Dynamically load the Unity loader script
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = LOADER_SCRIPT;
        script.onload = resolve;
        script.onerror = () => reject(new Error('Failed to load Unity loader: ' + LOADER_SCRIPT));
        document.body.appendChild(script);
      });
    }

    try {
      console.log('[IntroShow] Creating Unity instance...');
      unityInstance = await createUnityInstance(canvas, BUILD_CONFIG, (progress) => {
        // Loading progress (0 to 1)
        console.log('[IntroShow] Loading: ' + Math.round(progress * 100) + '%');
      });

      // Store reference for the jslib bridge
      window.unityInstance = unityInstance;

      console.log('[IntroShow] Unity instance created successfully');
    } catch (err) {
      console.error('[IntroShow] Failed to create Unity instance:', err);
    }
  }

  // ── Public API (matches WebGLScene interface) ──────

  return {
    /**
     * Start the intro show with the given configuration.
     * @param {Object} config - { showId, characterIds: [string, string, string], duration }
     */
    async start(config) {
      if (running) this.stop();

      running = true;
      paused = false;

      // Ensure defaults
      config = config || {};
      config.duration = config.duration || 30;
      config.characterIds = config.characterIds || ['peasant-girl', 'the-boss', 'aj'];
      config.showId = config.showId || 'wonder-words';

      // Load Unity if not already loaded
      if (!unityInstance) {
        await loadUnity();
      } else {
        // Unity already loaded — make sure canvas is visible again
        const canvas = document.getElementById('webgl-canvas');
        if (canvas) canvas.classList.add('active');
      }

      // Send config to Unity (or queue if not ready yet)
      if (ready) {
        sendConfig(config);
      } else {
        pendingConfig = config;
      }
    },

    pause() {
      if (!running || paused) return;
      paused = true;
      if (unityInstance) {
        unityInstance.SendMessage('IntroShowManager', 'Pause');
      }
    },

    resume() {
      if (!running || !paused) return;
      paused = false;
      if (unityInstance) {
        unityInstance.SendMessage('IntroShowManager', 'Resume');
      }
    },

    stop() {
      running = false;
      paused = false;
      if (unityInstance) {
        unityInstance.SendMessage('IntroShowManager', 'Stop');
      }

      const canvas = document.getElementById('webgl-canvas');
      if (canvas) canvas.classList.remove('active');
    },

    /**
     * Launch a single food item at the characters.
     * Triggered by the hamburger button in the player UI.
     */
    launchFood() {
      if (!running || !unityInstance) return;
      unityInstance.SendMessage('IntroShowManager', 'LaunchFood');
    },

    isRunning() { return running; },
    isPaused()  { return paused; },
  };
})();
