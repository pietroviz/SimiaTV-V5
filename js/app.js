/**
 * SiMia World — Main Application
 * Screen rendering, transitions, and UI updates.
 */

const App = (() => {
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  let currentEpisode = null;
  let currentShowForPlayer = null;
  let searchFilteredEpisodes = [];

  // ══════════════════════════════════════════════════
  // WATCH PROGRESS TRACKING
  // ══════════════════════════════════════════════════
  const watchProgress = {}; // { episodeId: { current, duration, percent } }

  function loadWatchProgress() {
    try {
      const saved = localStorage.getItem('simia-watch-progress');
      if (saved) Object.assign(watchProgress, JSON.parse(saved));
    } catch (e) { /* ignore */ }
  }

  function saveWatchProgress() {
    try {
      localStorage.setItem('simia-watch-progress', JSON.stringify(watchProgress));
    } catch (e) { /* ignore */ }
  }

  function updateWatchProgress(episodeId, currentTime, duration) {
    if (!episodeId || !duration) return;
    const percent = Math.min(100, Math.round((currentTime / duration) * 100));
    watchProgress[episodeId] = { current: currentTime, duration, percent };
    // Update the progress bar in the UI if visible
    const bars = document.querySelectorAll(`.episode-card[data-episode-id="${episodeId}"] .watch-progress-fill`);
    bars.forEach(bar => { bar.style.width = percent + '%'; });
    const containers = document.querySelectorAll(`.episode-card[data-episode-id="${episodeId}"] .watch-progress-bar`);
    containers.forEach(c => { c.style.display = (percent > 0) ? 'block' : 'none'; });
  }

  function getWatchPercent(episodeId) {
    return watchProgress[episodeId]?.percent || 0;
  }

  // ══════════════════════════════════════════════════
  // LOADER
  // ══════════════════════════════════════════════════
  function showLoader(tagline = 'Here we go!') {
    hideAllScreens();
    $('#loader-screen').classList.add('active');
    $('#loader-tagline').textContent = tagline;

    setTimeout(() => {
      $('#loader-screen').classList.add('fade-out');
      setTimeout(() => {
        $('#loader-screen').classList.remove('active', 'fade-out');
        showExplore();
      }, 600);
    }, 2800);
  }

  // ══════════════════════════════════════════════════
  // SCREEN TRANSITIONS
  // ══════════════════════════════════════════════════
  function hideAllScreens() {
    $$('.screen').forEach(s => s.classList.remove('active'));
  }

  function transitionTo(screenId) {
    hideAllScreens();
    const el = $(`#${screenId}`);
    el.classList.add('active');
  }

  // ══════════════════════════════════════════════════
  // EXPLORE SCREEN
  // ══════════════════════════════════════════════════
  function showExplore() {
    transitionTo('explore-screen');
    TVNav.setScreen('explore');
    renderExplore();
    updateFocus(TVNav.getState());
  }

  function renderExplore() {
    renderShowTabs();
    renderContent();
  }

  function renderShowTabs() {
    const container = $('#show-tabs');
    const navState = TVNav.getState();

    const tabs = [
      { id: 'featured', title: 'Featured', thumbnail: 'assets/shows/thumbs/ShowThumb_Featured.png' },
      ...SHOWS.map(s => ({ id: s.id, title: s.title, thumbnail: s.thumbnail })),
    ];

    container.innerHTML = tabs.map((tab, i) => `
      <button class="show-tab ${i === navState.selectedShowIndex ? 'selected' : ''}"
              data-index="${i}">
        <div class="show-tab-thumb">
          <img src="${tab.thumbnail}" alt="${tab.title}" />
        </div>
        <span class="show-tab-label">${tab.title}</span>
      </button>
    `).join('');
  }

  function renderContent() {
    const navState = TVNav.getState();
    const contentArea = $('#content-area');
    const pageTitle = $('#page-title');

    if (navState.viewMode === 'featured') {
      pageTitle.textContent = 'Explore';
      contentArea.innerHTML = '';
      FEATURED_ROWS.forEach((row, rowIndex) => {
        contentArea.innerHTML += renderEpisodeRow(row.label, row.episodes, rowIndex);
      });
    } else {
      const showIdx = navState.selectedShowIndex - 1;
      const show = SHOWS[showIdx];
      if (!show) return;
      pageTitle.textContent = show.title;
      // For show grid, show label on top then all episodes in a grid
      contentArea.innerHTML = `<h3 class="row-label">Episodes</h3>` + renderEpisodeGrid(show.episodes);
    }
  }

  function renderEpisodeRow(label, episodes, rowIndex) {
    const cards = episodes.map((ep, colIndex) =>
      renderEpisodeCard(ep, rowIndex, colIndex)
    ).join('');
    return `
      <div class="episode-row" data-row="${rowIndex}">
        <h3 class="row-label">${label}</h3>
        <div class="row-scroll">
          <div class="row-track">${cards}</div>
        </div>
      </div>
    `;
  }

  function renderEpisodeGrid(episodes) {
    const cols = TVNav.GRID_COLS;
    const cards = episodes.map((ep, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      return renderEpisodeCard(ep, row, col);
    }).join('');
    return `<div class="episode-grid">${cards}</div>`;
  }

  function renderEpisodeCard(episode, row, col) {
    // Find which show this episode belongs to, for building the video URL
    const show = episode._showId
      ? SHOWS.find(s => s.id === episode._showId)
      : SHOWS.find(s => s.episodes.some(e => e.id === episode.id));
    const videoUrl = show
      ? `${GCS_BUCKET}/${encodeURIComponent(show.folder)}/${episode.file}.mp4`
      : '';
    const showArrayIndex = show ? SHOWS.indexOf(show) : 0;
    const wp = getWatchPercent(episode.id);
    const progressDisplay = wp > 0 ? 'block' : 'none';
    return `
      <div class="episode-card" data-row="${row}" data-col="${col}" data-episode-id="${episode.id}" data-video-url="${videoUrl}" data-preview-start="${episode.previewStart || 0}" data-show-index="${showArrayIndex}">
        <div class="card-thumb-wrapper">
          <div class="card-thumb">
            <img class="card-thumb-img" src="${episode.thumbnail}" alt="${episode.title}" loading="lazy" />
            <video class="card-preview-video" muted playsinline preload="none"></video>
            <span class="duration-badge">${episode.duration}</span>
            <div class="watch-progress-bar" style="display:${progressDisplay}">
              <div class="watch-progress-fill" style="width:${wp}%"></div>
            </div>
          </div>
        </div>
        <p class="card-title">E${episode.num}: ${episode.title}</p>
      </div>
    `;
  }


  // ══════════════════════════════════════════════════
  // THUMBNAIL VIDEO PREVIEW
  // ══════════════════════════════════════════════════
  let previewTimeout = null;
  let activePreviewCard = null;

  function startPreview(card) {
    stopPreview(); // clean up any existing preview

    if (!card) return;
    const videoUrl = card.dataset.videoUrl;
    if (!videoUrl) return;

    // Delay before starting preview (don't preview if user is just scrolling through)
    previewTimeout = setTimeout(() => {
      const video = card.querySelector('.card-preview-video');
      if (!video) return;

      video.src = videoUrl;
      video.muted = true;

      const previewStart = parseInt(card.dataset.previewStart) || 0;
      const onCanPlay = () => {
        video.removeEventListener('canplaythrough', onCanPlay);
        video.currentTime = previewStart; // start at midpoint, matching thumbnail
        video.classList.add('active');
        video.play().catch(() => {});
      };
      video.addEventListener('canplaythrough', onCanPlay);
      video.load();

      activePreviewCard = card;
    }, 800); // 800ms delay before preview starts
  }

  function stopPreview() {
    clearTimeout(previewTimeout);
    if (activePreviewCard) {
      const video = activePreviewCard.querySelector('.card-preview-video');
      if (video) {
        video.pause();
        video.removeAttribute('src');
        video.load(); // reset
        video.classList.remove('active');
      }
      activePreviewCard = null;
    }
  }


  // ══════════════════════════════════════════════════
  // PLAYER SCREEN
  // ══════════════════════════════════════════════════
  let isPlaying = true;
  let videoElement = null;
  let controlsTimeout = null;
  let enteredFromBuilder = false;

  function showPlayer(episode, showArrayIndex) {
    stopPreview(); // stop any thumbnail preview before entering player
    currentEpisode = episode;
    currentShowForPlayer = SHOWS[showArrayIndex] || SHOWS[0];
    enteredFromBuilder = false;

    transitionTo('player-screen');

    $('#player-show-title').textContent = currentShowForPlayer.title;
    $('#player-episode-title').textContent = `E${episode.num}: ${episode.title}`;
    $('#player-poster').src = episode.thumbnail;

    // Traditional video mode — hide burger, show timeline, normal layout
    const burgerBtn = $('#launch-food-btn');
    if (burgerBtn) { burgerBtn.classList.add('hidden'); burgerBtn.classList.remove('webgl-mode'); }
    const progressRow = document.querySelector('.player-progress-row');
    if (progressRow) progressRow.classList.remove('hidden-timeline');
    const infoRow = document.querySelector('.player-info-row');
    if (infoRow) infoRow.classList.remove('webgl-compact');

    TVNav.goToPlayer();

    const videoUrl = `${GCS_BUCKET}/${encodeURIComponent(currentShowForPlayer.folder)}/${episode.file}.mp4`;
    videoElement = $('#player-video');
    videoElement.src = videoUrl;
    videoElement.classList.add('active');
    videoElement.currentTime = 0;

    isPlaying = true;
    $('#play-pause-icon').src = 'assets/graphics/Icon_Pause.png';
    videoElement.play().catch(() => {
      isPlaying = false;
      $('#play-pause-icon').src = 'assets/graphics/Icon_Play.png';
    });

    videoElement.addEventListener('timeupdate', updateVideoProgress);
    videoElement.addEventListener('ended', onVideoEnded);
    videoElement.addEventListener('loadedmetadata', onVideoMetadata);

    showPlayerControls();
  }

  function onVideoMetadata() {
    if (videoElement) {
      $('#total-time').textContent = formatTime(Math.floor(videoElement.duration));
    }
  }

  function updateVideoProgress() {
    if (!videoElement) return;
    const current = videoElement.currentTime;
    const total = videoElement.duration || 1;
    const pct = (current / total) * 100;
    $('#progress-fill').style.width = pct + '%';
    const scrubber = $('#player-scrubber');
    if (scrubber) scrubber.style.left = pct + '%';
    $('#current-time').textContent = formatTime(Math.floor(current));
    $('#total-time').textContent = formatTime(Math.floor(total));
    // Save watch progress every few seconds
    if (currentEpisode && Math.floor(current) % 3 === 0) {
      updateWatchProgress(currentEpisode.id, current, total);
    }
  }

  function onVideoEnded() {
    isPlaying = false;
    $('#play-pause-icon').src = 'assets/graphics/Icon_Play.png';
    showPlayerControls();
  }

  function showPlayerControls() {
    const overlay = $('#player-overlay');
    if (overlay) {
      overlay.classList.remove('hidden');
    }
    clearTimeout(controlsTimeout);
    // Auto-hide overlay for video playback; keep visible for WebGL
    if (isPlaying && !IntroShowWebGL.isRunning()) {
      controlsTimeout = setTimeout(() => {
        if (overlay && isPlaying) {
          overlay.classList.add('hidden');
        }
      }, 4000);
    }
  }

  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  function scrub(seconds) {
    if (!videoElement) return;
    const newTime = Math.max(0, Math.min(videoElement.duration || 0, videoElement.currentTime + seconds));
    videoElement.currentTime = newTime;
    // Immediately update the UI
    updateVideoProgress();
    showPlayerControls();
  }

  function togglePlayPause() {
    // Handle Unity IntroShow WebGL mode
    if (IntroShowWebGL.isRunning() || IntroShowWebGL.isPaused()) {
      if (isPlaying) {
        IntroShowWebGL.pause();
        isPlaying = false;
        $('#play-pause-icon').src = 'assets/graphics/Icon_Play.png';
      } else {
        IntroShowWebGL.resume();
        isPlaying = true;
        $('#play-pause-icon').src = 'assets/graphics/Icon_Pause.png';
      }
      showPlayerControls();
      return;
    }
    // Handle video mode
    if (!videoElement) return;
    if (isPlaying) {
      videoElement.pause();
      isPlaying = false;
      $('#play-pause-icon').src = 'assets/graphics/Icon_Play.png';
    } else {
      videoElement.play().catch(() => {});
      isPlaying = true;
      $('#play-pause-icon').src = 'assets/graphics/Icon_Pause.png';
    }
    showPlayerControls();
  }

  function exitPlayer() {
    const wasFromBuilder = enteredFromBuilder;

    // Stop Unity IntroShow if running
    if (IntroShowWebGL.isRunning() || IntroShowWebGL.isPaused()) {
      IntroShowWebGL.stop();
    }

    // Save final watch position
    if (currentEpisode && videoElement && videoElement.duration) {
      updateWatchProgress(currentEpisode.id, videoElement.currentTime, videoElement.duration);
      saveWatchProgress();
    }
    if (videoElement) {
      videoElement.pause();
      videoElement.removeEventListener('timeupdate', updateVideoProgress);
      videoElement.removeEventListener('ended', onVideoEnded);
      videoElement.removeEventListener('loadedmetadata', onVideoMetadata);
      videoElement.src = '';
      videoElement.classList.remove('active');
    }
    clearTimeout(controlsTimeout);
    $('#progress-fill').style.width = '0%';
    const scrubber = $('#player-scrubber');
    if (scrubber) scrubber.style.left = '0%';

    // Restore player UI elements to default state
    const progressRow = document.querySelector('.player-progress-row');
    if (progressRow) { progressRow.style.display = ''; progressRow.classList.remove('hidden-timeline'); }
    const burgerBtn = $('#launch-food-btn');
    if (burgerBtn) { burgerBtn.classList.remove('hidden', 'webgl-mode'); }
    const infoRow = document.querySelector('.player-info-row');
    if (infoRow) infoRow.classList.remove('webgl-compact');

    enteredFromBuilder = false;

    if (wasFromBuilder) {
      showBuilder();
    } else {
      showExplore();
    }
  }


  // ══════════════════════════════════════════════════
  // SEARCH SCREEN (Coming Soon)
  // ══════════════════════════════════════════════════
  function showSearch() {
    transitionTo('search-screen');
    TVNav.setScreen('search');
    updateFocus(TVNav.getState());
  }


  // ══════════════════════════════════════════════════
  // SETTINGS SCREEN (Coming Soon)
  // ══════════════════════════════════════════════════
  function showSettings() {
    transitionTo('settings-screen');
    TVNav.setScreen('settings');
    updateFocus(TVNav.getState());
  }


  // ══════════════════════════════════════════════════
  // SHOW BUILDER SCREEN
  // ══════════════════════════════════════════════════
  function showBuilder() {
    transitionTo('builder-screen');
    TVNav.setScreen('builder');
    renderBuilderSlots();
    updateFocus(TVNav.getState());

    // Preload Unity WebGL in background so it's ready when user clicks "Play Now"
    if (typeof IntroShowWebGL !== 'undefined' && IntroShowWebGL.preload) {
      IntroShowWebGL.preload().catch(err => console.warn('[App] Unity preload failed:', err));
    }
  }

  function animateSwap(el, newSrc, newAlt) {
    el.classList.remove('swap-up', 'swap-down');
    el.src = newSrc;
    el.alt = newAlt || '';
    // Force reflow to restart animation
    void el.offsetWidth;
    el.classList.add('swap-up');
    el.addEventListener('animationend', () => {
      el.classList.remove('swap-up', 'swap-down');
    }, { once: true });
  }

  function renderBuilderSlots() {
    const container = $('#builder-slots');
    const navState = TVNav.getState();

    const currentShow = SHOWS[navState.builderShowChoice];
    const currentEnv = ENVIRONMENTS[navState.builderEnvChoice];
    const chars = navState.builderCharChoices.map(i => CHARACTERS[i]);

    const slots = [
      { name: currentShow.title, type: 'show' },
      { name: chars[0].name, type: 'character' },
      { name: chars[1].name, type: 'character' },
      { name: chars[2].name, type: 'character' },
      { name: currentEnv.name, type: 'environment' },
    ];

    container.innerHTML = slots.map((slot, i) => {
      const isFocused = navState.region === 'builder-slots' && i === navState.builderSlotIndex;
      return `
        <div class="builder-slot ${isFocused ? 'focused' : ''}" data-slot="${i}">
          <div class="builder-slot-rect">
            <span class="builder-slot-name">${slot.name}</span>
          </div>
        </div>
      `;
    }).join('');

    // Update environment background
    const envBg = $('#builder-env-bg');
    envBg.style.backgroundImage = `url('${currentEnv.fullImage || currentEnv.thumbnail}')`;

    // Update show logo (with swap animation)
    const logoEl = $('#builder-show-logo');
    if (logoEl) {
      const newLogoSrc = currentShow.builderLogo || '';
      if (logoEl.src !== new URL(newLogoSrc, window.location.href).href && newLogoSrc) {
        animateSwap(logoEl, newLogoSrc, currentShow.title);
      } else {
        logoEl.src = newLogoSrc;
        logoEl.alt = currentShow.title;
      }
    }

    // Update character images (with swap animation)
    const charEls = [
      $('#builder-char-1'),
      $('#builder-char-2'),
      $('#builder-char-3'),
    ];
    chars.forEach((char, i) => {
      if (charEls[i]) {
        const newSrc = char.fullImage || '';
        if (charEls[i].src !== new URL(newSrc, window.location.href).href && newSrc) {
          animateSwap(charEls[i], newSrc, char.name);
        } else {
          charEls[i].src = newSrc;
          charEls[i].alt = char.name;
        }
      }
    });

    positionBuilderArrows(navState);
  }

  function positionBuilderArrows(navState) {
    const arrowsEl = $('#builder-arrows');
    if (!arrowsEl) return;

    if (navState.region !== 'builder-slots') {
      arrowsEl.classList.remove('visible');
      return;
    }

    const slotEl = $(`.builder-slot[data-slot="${navState.builderSlotIndex}"]`);
    if (!slotEl) { arrowsEl.classList.remove('visible'); return; }

    arrowsEl.classList.add('visible');

    const rectEl = slotEl.querySelector('.builder-slot-rect');
    if (!rectEl) return;

    const screenEl = $('#builder-screen');
    const screenRect = screenEl.getBoundingClientRect();
    const rectBounds = rectEl.getBoundingClientRect();
    const scale = screenRect.width / 1920;

    const centerX = (rectBounds.left - screenRect.left + rectBounds.width / 2) / scale;
    const topY = (rectBounds.top - screenRect.top) / scale - 60;
    const bottomY = (rectBounds.bottom - screenRect.top) / scale + 8;

    arrowsEl.style.left = (centerX - 32) + 'px';

    const arrowUp = $('#builder-arrow-up');
    const arrowDown = $('#builder-arrow-down');
    arrowUp.style.position = 'absolute';
    arrowUp.style.top = topY + 'px';
    arrowUp.style.left = '0';
    arrowDown.style.position = 'absolute';
    arrowDown.style.top = bottomY + 'px';
    arrowDown.style.left = '0';
  }

  function randomizeBuilder() {
    const randomShow = Math.floor(Math.random() * SHOWS.length);
    const randomEnv = Math.floor(Math.random() * ENVIRONMENTS.length);
    const indices = [];
    while (indices.length < 3) {
      const r = Math.floor(Math.random() * CHARACTERS.length);
      if (!indices.includes(r)) indices.push(r);
    }
    TVNav.setBuilderChoices({ show: randomShow, chars: indices, env: randomEnv });
  }


  // ══════════════════════════════════════════════════
  // FOCUS RENDERING
  // ══════════════════════════════════════════════════
  function updateFocus(navState) {
    $$('.focused').forEach(el => el.classList.remove('focused'));
    $$('.tab-focused').forEach(el => el.classList.remove('tab-focused'));

    // Sidebar expansion
    ['#sidebar', '#search-sidebar', '#settings-sidebar'].forEach(sel => {
      const sb = $(sel);
      if (!sb) return;
      if (navState.region === 'sidebar') sb.classList.add('expanded');
      else sb.classList.remove('expanded');
    });

    // Stop any active preview when focus changes away from content
    if (navState.region !== 'content' && navState.region !== 'search-results') {
      stopPreview();
    }

    if (navState.screen === 'explore') updateExploreFocus(navState);
    else if (navState.screen === 'player') updatePlayerFocus(navState);
    else if (navState.screen === 'search') updateSearchFocus(navState);
    else if (navState.screen === 'settings') updateSettingsFocus(navState);
    else if (navState.screen === 'builder') updateBuilderFocus(navState);
  }

  function updateExploreFocus(ns) {
    if (ns.region === 'sidebar') {
      const items = $$('#explore-screen .sidebar-item');
      if (items[ns.sidebarIndex]) items[ns.sidebarIndex].classList.add('focused');
    } else if (ns.region === 'show-tabs') {
      const tabs = $$('.show-tab');
      if (tabs[ns.showTabIndex]) {
        tabs[ns.showTabIndex].classList.add('tab-focused');
      }
      // Scroll explore-content to top when in show-tabs
      const exploreContent = $('.explore-content');
      if (exploreContent) exploreContent.scrollTop = 0;
    } else if (ns.region === 'content') {
      const card = $(`.episode-card[data-row="${ns.contentRow}"][data-col="${ns.contentCol}"]`);
      if (card) {
        card.classList.add('focused');
        scrollCardIntoView(card, ns);
        startPreview(card);
      } else {
        stopPreview();
      }
    }
  }

  function updatePlayerFocus(ns) {
    // 0 = back, 1 = play/pause, 2 = playhead/scrubber, 3 = launch-food (WebGL only)
    const controls = enteredFromBuilder
      ? [$('#player-back-btn'), $('#play-pause-btn'), null, $('#launch-food-btn')]
      : [$('#player-back-btn'), $('#play-pause-btn'), null, null];
    if (ns.region === 'player-controls') {
      if (ns.playerControlIndex < controls.length && controls[ns.playerControlIndex]) {
        controls[ns.playerControlIndex].classList.add('focused');
      }
    }
    // Scrubber gets its own focus state (index 2)
    const scrubber = $('#player-scrubber');
    if (scrubber) {
      if (ns.playerControlIndex === 2) scrubber.classList.add('focused');
      else scrubber.classList.remove('focused');
    }
    showPlayerControls();
  }

  function updateSearchFocus(ns) {
    if (ns.region === 'sidebar') {
      const items = $$('#search-screen .sidebar-item');
      if (items[ns.sidebarIndex]) items[ns.sidebarIndex].classList.add('focused');
    }
  }

  function updateSettingsFocus(ns) {
    if (ns.region === 'sidebar') {
      const items = $$('#settings-screen .sidebar-item');
      if (items[ns.sidebarIndex]) items[ns.sidebarIndex].classList.add('focused');
    }
  }

  function updateBuilderFocus(ns) {
    renderBuilderSlots();
    if (ns.region === 'builder-actions') {
      const btns = [$('#builder-back'), $('#builder-random'), $('#builder-play')];
      if (btns[ns.builderActionIndex]) btns[ns.builderActionIndex].classList.add('focused');
    }
  }

  function scrollCardIntoView(card, ns) {
    // Horizontal scroll within row (for Featured view)
    if (ns.viewMode === 'featured') {
      const scrollContainer = card.closest('.row-scroll');
      if (scrollContainer) {
        const cardRect = card.getBoundingClientRect();
        const containerRect = scrollContainer.getBoundingClientRect();
        const rightBuffer = containerRect.width * 0.25; // keep 25% space on right
        const leftBuffer = containerRect.width * 0.15;  // keep 15% space on left
        if (cardRect.right > containerRect.right - rightBuffer) {
          scrollContainer.scrollBy({ left: cardRect.right - containerRect.right + rightBuffer, behavior: 'smooth' });
        } else if (cardRect.left < containerRect.left + leftBuffer) {
          scrollContainer.scrollBy({ left: cardRect.left - containerRect.left - leftBuffer, behavior: 'smooth' });
        }
      }
    }
    // Vertical scroll within explore-content (the whole page scrolls)
    // Apple TV style: keep the focused item roughly in the upper-center third of visible area
    const exploreContent = $('.explore-content');
    if (exploreContent) {
      const cardRect = card.getBoundingClientRect();
      const containerRect = exploreContent.getBoundingClientRect();
      const containerHeight = containerRect.height;
      const bottomBuffer = containerHeight * 0.30; // keep 30% space below
      const topBuffer = containerHeight * 0.25;    // keep 25% space above
      if (cardRect.bottom > containerRect.bottom - bottomBuffer) {
        exploreContent.scrollBy({ top: cardRect.bottom - containerRect.bottom + bottomBuffer, behavior: 'smooth' });
      } else if (cardRect.top < containerRect.top + topBuffer) {
        exploreContent.scrollBy({ top: cardRect.top - containerRect.top - topBuffer, behavior: 'smooth' });
      }
    }
  }


  // ══════════════════════════════════════════════════
  // SIDEBAR HANDLER
  // ══════════════════════════════════════════════════
  function handleSidebarSelection(index) {
    if (index === 0) showSearch();
    else if (index === 1) showExplore();
    else if (index === 2) showBuilder();
    else if (index === 3) showSettings();
  }

  function handleBuilderAction(actionIndex) {
    if (actionIndex === 0) showExplore();
    else if (actionIndex === 1) randomizeBuilder();
    else if (actionIndex === 2) showBuilderPlayer();
  }

  function showBuilderPlayer() {
    const navState = TVNav.getState();
    const show = SHOWS[navState.builderShowChoice];
    stopPreview();
    enteredFromBuilder = true;

    transitionTo('player-screen');

    // Set up the player info text
    $('#player-show-title').textContent = show ? show.title : 'Custom Show';
    $('#player-episode-title').textContent = 'Intro Preview';
    $('#player-poster').src = '';

    // WebGL mode — show burger at bottom-right, hide timeline, compact info row
    const burgerBtn = $('#launch-food-btn');
    if (burgerBtn) { burgerBtn.classList.remove('hidden'); burgerBtn.classList.add('webgl-mode'); }
    const progressRow = document.querySelector('.player-progress-row');
    if (progressRow) progressRow.classList.add('hidden-timeline');
    const infoRow = document.querySelector('.player-info-row');
    if (infoRow) infoRow.classList.add('webgl-compact');

    TVNav.goToPlayer();

    // Build config from the current builder selections
    // Map V3 front-end character IDs → Unity WebGL model IDs
    const chars = navState.builderCharChoices.map(i => CHARACTERS[i]);
    const introConfig = {
      showId: show ? show.id : 'wonder-words',
      characterIds: chars.map(c => CHARACTER_WEBGL_MAP[c.id] || c.id),
      duration: 30
    };

    // Start Unity IntroShow scene with the config
    isPlaying = true;
    $('#play-pause-icon').src = 'assets/graphics/Icon_Pause.png';
    IntroShowWebGL.start(introConfig);

    showPlayerControls();
  }


  // ══════════════════════════════════════════════════
  // INIT
  // ══════════════════════════════════════════════════
  function init() {
    loadWatchProgress();

    TVNav.init({
      onFocusChange: updateFocus,

      onSelect: (action) => {
        if (action.type === 'show-tab') {
          renderShowTabs();
          renderContent();
          updateFocus(TVNav.getState());
        } else if (action.type === 'episode') {
          showPlayer(action.episode, action.showArrayIndex, action.card);
        } else if (action.type === 'sidebar') {
          handleSidebarSelection(action.index);
        } else if (action.type === 'builder-action') {
          handleBuilderAction(action.action);
        } else if (action.type === 'builder-slot-select') {
          renderBuilderSlots();
        }
      },

      onBack: (info) => {
        if (info.from === 'player') exitPlayer();
        else if (info.from === 'show-detail') { renderShowTabs(); renderContent(); updateFocus(TVNav.getState()); }
        else if (info.from === 'search') showExplore();
        else if (info.from === 'settings') showExplore();
        else if (info.from === 'builder') showExplore();
      },

      onPlayerAction: (action) => {
        if (action === 'toggle') togglePlayPause();
        else if (action === 'scrub-forward') scrub(5);
        else if (action === 'scrub-back') scrub(-5);
        else if (action === 'launch-food') IntroShowWebGL.launchFood();
      },
    });

    // Mouse click handlers for player
    $('#play-pause-btn').addEventListener('click', togglePlayPause);
    $('#player-back-btn').addEventListener('click', exitPlayer);
    $('#launch-food-btn').addEventListener('click', () => IntroShowWebGL.launchFood());

    // Start with loader
    showLoader('Here we go!');
  }

  document.addEventListener('DOMContentLoaded', init);

  return { showExplore, showPlayer, exitPlayer, showSearch, showSettings, showBuilder, isWebGLMode: () => enteredFromBuilder };
})();
