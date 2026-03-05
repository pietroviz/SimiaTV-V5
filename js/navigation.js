/**
 * SiMia World — TV Navigation System
 * D-pad focus management for smart TV remote simulation.
 * Arrow keys navigate, Enter selects, Escape = back.
 */

const TVNav = (() => {
  const state = {
    screen: 'loader',
    region: 'show-tabs',
    sidebarIndex: 1,
    showTabIndex: 0,
    selectedShowIndex: 0,
    contentRow: 0,
    contentCol: 0,
    viewMode: 'featured',

    // Search
    searchText: '',
    searchKeyboardRow: 0,
    searchKeyboardCol: 0,

    // Settings
    settingsIndex: 0,
    settingsDetailIndex: 0,

    // Player
    playerControlIndex: 1,

    // Builder
    builderSlotIndex: 0,
    builderShowChoice: 0,
    builderCharChoices: [0, 1, 2],
    builderEnvChoice: 0,
    builderActionIndex: 1,
  };

  // Track which rows the user has visited (to know whether to reset col to 0)
  const visitedRows = new Set();
  // Store last content position before entering sidebar
  let savedContentRow = 0;
  let savedContentCol = 0;
  let savedContentRegion = 'show-tabs'; // was user in 'content' or 'show-tabs'?

  // Builder: track if user arrived at Play Now from the Env slot (for left-press edge case)
  let builderCameFromEnv = false;

  const GRID_COLS = 4;
  const SEARCH_RESULT_COLS = 2;
  const TOTAL_TABS = () => SHOWS.length + 1;

  // Keyboard layout matching design: 6 cols, A-Z, 0-9, SPACE/DEL/CLR
  const KEYBOARD_LAYOUT = [
    ['A', 'B', 'C', 'D', 'E', 'F'],
    ['G', 'H', 'I', 'J', 'K', 'L'],
    ['M', 'N', 'O', 'P', 'Q', 'R'],
    ['S', 'T', 'U', 'V', 'W', 'X'],
    ['Y', 'Z', '1', '2', '3', '4'],
    ['5', '6', '7', '8', '9', '0'],
  ];
  const KEYBOARD_SPECIAL_ROW = ['SPACE', 'DEL', 'CLR'];
  const KEYBOARD_ROWS = KEYBOARD_LAYOUT.length + 1; // +1 for special row

  let callbacks = {};

  function clamp(val, min, max) { return Math.max(min, Math.min(max, val)); }
  function makeRowKey(row) { return `${state.viewMode}-${state.selectedShowIndex}-${row}`; }
  function emit() { if (callbacks.onFocusChange) callbacks.onFocusChange({ ...state }); }

  function getContentLayout() {
    if (state.viewMode === 'featured') {
      return {
        rows: FEATURED_ROWS.length,
        getCols: (row) => FEATURED_ROWS[row] ? FEATURED_ROWS[row].episodes.length : 0,
      };
    } else {
      const showIdx = state.selectedShowIndex - 1;
      const show = SHOWS[showIdx];
      if (!show) return { rows: 0, getCols: () => 0 };
      const total = show.episodes.length;
      return {
        rows: Math.ceil(total / GRID_COLS),
        getCols: (row) => Math.min(GRID_COLS, total - row * GRID_COLS),
      };
    }
  }

  // ── Movement handlers ──────────────────────────────

  function moveUp() {
    if (state.screen === 'explore') {
      if (state.region === 'content') {
        if (state.contentRow > 0) {
          state.contentRow--;
          const layout = getContentLayout();
          state.contentCol = clamp(state.contentCol, 0, layout.getCols(state.contentRow) - 1);
        } else {
          state.region = 'show-tabs';
          state.showTabIndex = state.selectedShowIndex;
        }
      } else if (state.region === 'sidebar') {
        state.sidebarIndex = Math.max(0, state.sidebarIndex - 1);
      }
    } else if (state.screen === 'search' || state.screen === 'settings') {
      if (state.region === 'sidebar') {
        state.sidebarIndex = Math.max(0, state.sidebarIndex - 1);
      } else if (state.region === 'coming-soon') {
        state.region = 'sidebar';
        state.sidebarIndex = (state.screen === 'search') ? 0 : 3;
      }
    } else if (state.screen === 'player') {
      if (state.region === 'player-controls') {
        const isWebGL = typeof App !== 'undefined' && App.isWebGLMode?.();
        if (isWebGL) {
          // WebGL: up from burger(3) → back(0), up from play(1) → back(0)
          if (state.playerControlIndex === 3 || state.playerControlIndex === 1) state.playerControlIndex = 0;
        } else {
          // Video: playhead(2) → play(1) → back(0)
          if (state.playerControlIndex > 0) state.playerControlIndex--;
        }
      }
    } else if (state.screen === 'builder') {
      if (state.region === 'builder-slots') {
        // Up/down on slots = cycle the selection for that slot
        cycleSlotOption(-1);
      } else if (state.region === 'builder-actions') {
        // Up on actions = move up (Back=0 is the ceiling)
        if (state.builderActionIndex > 0) {
          state.builderActionIndex--;
          builderCameFromEnv = false; // navigated away from Play Now
        }
      }
    }
    emit();
  }

  function moveDown() {
    if (state.screen === 'explore') {
      if (state.region === 'show-tabs') {
        state.region = 'content';
        state.contentRow = 0;
        state.contentCol = 0;
        visitedRows.add(makeRowKey(0));
      } else if (state.region === 'content') {
        const layout = getContentLayout();
        if (state.contentRow < layout.rows - 1) {
          const nextRow = state.contentRow + 1;
          const rowKey = makeRowKey(nextRow);
          state.contentRow = nextRow;
          if (!visitedRows.has(rowKey)) {
            // First time visiting this row — start from the beginning
            state.contentCol = 0;
            visitedRows.add(rowKey);
          } else {
            state.contentCol = clamp(state.contentCol, 0, layout.getCols(state.contentRow) - 1);
          }
        }
      } else if (state.region === 'sidebar') {
        state.sidebarIndex = Math.min(3, state.sidebarIndex + 1);
      }
    } else if (state.screen === 'player') {
      if (state.region === 'player-controls') {
        const isWebGL = typeof App !== 'undefined' && App.isWebGLMode?.();
        if (isWebGL) {
          // WebGL: down from back(0) → play(1), down from burger(3) → play(1)
          if (state.playerControlIndex === 0 || state.playerControlIndex === 3) state.playerControlIndex = 1;
        } else {
          // Video: back(0) → play(1) → playhead(2)
          if (state.playerControlIndex < 2) state.playerControlIndex++;
        }
      }
    } else if (state.screen === 'search' || state.screen === 'settings') {
      if (state.region === 'sidebar') {
        state.sidebarIndex = Math.min(3, state.sidebarIndex + 1);
      } else if (state.region === 'coming-soon') {
        state.region = 'sidebar';
        state.sidebarIndex = (state.screen === 'search') ? 0 : 3;
      }
    } else if (state.screen === 'builder') {
      if (state.region === 'builder-slots') {
        // Up/down on slots = cycle the selection for that slot
        cycleSlotOption(1);
      } else if (state.region === 'builder-actions') {
        // Down on actions = move down (Play Now=2 is the floor)
        if (state.builderActionIndex < 2) state.builderActionIndex++;
      }
    }
    emit();
  }

  function moveLeft() {
    if (state.screen === 'explore') {
      if (state.region === 'content') {
        if (state.contentCol > 0) state.contentCol--;
        else {
          // Save position before entering sidebar
          savedContentRow = state.contentRow;
          savedContentCol = state.contentCol;
          savedContentRegion = 'content';
          state.region = 'sidebar'; state.sidebarIndex = 1;
        }
      } else if (state.region === 'show-tabs') {
        if (state.showTabIndex > 0) state.showTabIndex--;
        else {
          // Save that we were in show-tabs
          savedContentRegion = 'show-tabs';
          state.region = 'sidebar'; state.sidebarIndex = 1;
        }
      }
    } else if (state.screen === 'search' || state.screen === 'settings') {
      if (state.region === 'coming-soon') {
        state.region = 'sidebar';
        state.sidebarIndex = (state.screen === 'search') ? 0 : 3;
      }
    } else if (state.screen === 'player') {
      if (state.region === 'player-controls') {
        const isWebGL = typeof App !== 'undefined' && App.isWebGLMode?.();
        if (isWebGL) {
          // WebGL: left from play(1) → back(0), left from burger(3) → play(1)
          if (state.playerControlIndex === 1) state.playerControlIndex = 0;
          else if (state.playerControlIndex === 3) state.playerControlIndex = 1;
        } else {
          // Video: left from playhead → scrub backward
          if (state.playerControlIndex === 2) {
            if (callbacks.onPlayerAction) callbacks.onPlayerAction('scrub-back');
          }
        }
      }
    } else if (state.screen === 'builder') {
      if (state.region === 'builder-slots') {
        if (state.builderSlotIndex > 0) {
          // Move left through slots
          state.builderSlotIndex--;
        } else {
          // At Show (slot 0), left → actions (Random)
          state.region = 'builder-actions';
          state.builderActionIndex = 1;
          builderCameFromEnv = false;
        }
      } else if (state.region === 'builder-actions') {
        if (state.builderActionIndex === 2 && builderCameFromEnv) {
          // Edge case: on Play Now, if came from Env, left returns to Env
          state.region = 'builder-slots';
          state.builderSlotIndex = 4;
          builderCameFromEnv = false;
        } else if (state.builderActionIndex > 0) {
          // Left on actions moves up: Play Now(2) → Random(1) → Back(0)
          state.builderActionIndex--;
          builderCameFromEnv = false;
        }
      }
    }
    emit();
  }

  function moveRight() {
    if (state.screen === 'explore') {
      if (state.region === 'sidebar') {
        // Restore saved position when leaving sidebar
        if (savedContentRegion === 'content') {
          state.region = 'content';
          state.contentRow = savedContentRow;
          const layout = getContentLayout();
          state.contentCol = clamp(savedContentCol, 0, layout.getCols(state.contentRow) - 1);
        } else {
          state.region = 'show-tabs';
        }
      } else if (state.region === 'content') {
        const layout = getContentLayout();
        const maxCol = layout.getCols(state.contentRow) - 1;
        if (state.contentCol < maxCol) state.contentCol++;
      } else if (state.region === 'show-tabs') {
        if (state.showTabIndex < TOTAL_TABS() - 1) state.showTabIndex++;
      }
    } else if (state.screen === 'search' || state.screen === 'settings') {
      if (state.region === 'sidebar') {
        state.region = 'coming-soon';
      }
    } else if (state.screen === 'player') {
      if (state.region === 'player-controls') {
        const isWebGL = typeof App !== 'undefined' && App.isWebGLMode?.();
        if (isWebGL) {
          // WebGL: right from back(0) → play(1), right from play(1) → burger(3)
          if (state.playerControlIndex === 0) state.playerControlIndex = 1;
          else if (state.playerControlIndex === 1) state.playerControlIndex = 3;
        } else {
          // Video: right from playhead → scrub forward
          if (state.playerControlIndex === 2) {
            if (callbacks.onPlayerAction) callbacks.onPlayerAction('scrub-forward');
          }
        }
      }
    } else if (state.screen === 'builder') {
      if (state.region === 'builder-actions') {
        if (state.builderActionIndex < 1) {
          // Back(0) → right → Random(1)
          state.builderActionIndex++;
        } else {
          // Random(1) or Play Now(2) → right → Show selector (slot 0)
          state.region = 'builder-slots';
          state.builderSlotIndex = 0;
          builderCameFromEnv = false;
        }
      } else if (state.region === 'builder-slots') {
        if (state.builderSlotIndex < 4) {
          // Move right through slots
          state.builderSlotIndex++;
        } else {
          // At Env (slot 4), right → Play Now
          state.region = 'builder-actions';
          state.builderActionIndex = 2;
          builderCameFromEnv = true;
        }
      }
    }
    emit();
  }

  function select() {
    if (state.screen === 'loader') return;

    if (state.screen === 'player') {
      if (state.region === 'player-controls') {
        if (state.playerControlIndex === 0) { back(); return; }
        if (state.playerControlIndex === 1 && callbacks.onPlayerAction) callbacks.onPlayerAction('toggle');
        // playerControlIndex === 2 (playhead): Enter does nothing, use left/right to scrub
        if (state.playerControlIndex === 3 && callbacks.onPlayerAction) callbacks.onPlayerAction('launch-food');
      }
      return;
    }

    if (state.screen === 'explore') {
      if (state.region === 'show-tabs') {
        state.selectedShowIndex = state.showTabIndex;
        state.viewMode = (state.showTabIndex === 0) ? 'featured' : 'show';
        state.contentRow = 0;
        state.contentCol = 0;
        visitedRows.clear(); // Reset row tracking when switching views
        savedContentRegion = 'show-tabs'; // Reset saved position
        if (callbacks.onSelect) callbacks.onSelect({ type: 'show-tab', tabIndex: state.showTabIndex });
      } else if (state.region === 'content') {
        let episode, showArrayIndex;
        if (state.viewMode === 'featured') {
          episode = FEATURED_ROWS[state.contentRow]?.episodes[state.contentCol];
          // For featured rows, find the actual show from the episode
          if (episode) {
            const show = episode._showId
              ? SHOWS.find(s => s.id === episode._showId)
              : SHOWS.find(s => s.episodes.some(e => e.id === episode.id));
            showArrayIndex = show ? SHOWS.indexOf(show) : 0;
          }
        } else {
          showArrayIndex = state.selectedShowIndex - 1;
          const show = SHOWS[showArrayIndex];
          const epIndex = state.contentRow * GRID_COLS + state.contentCol;
          episode = show?.episodes[epIndex];
        }
        if (episode && callbacks.onSelect) {
          callbacks.onSelect({ type: 'episode', episode, showArrayIndex });
        }
      } else if (state.region === 'sidebar') {
        if (callbacks.onSelect) callbacks.onSelect({ type: 'sidebar', index: state.sidebarIndex });
      }
    } else if (state.screen === 'search' || state.screen === 'settings') {
      if (state.region === 'sidebar') {
        if (callbacks.onSelect) callbacks.onSelect({ type: 'sidebar', index: state.sidebarIndex });
      }
    } else if (state.screen === 'builder') {
      if (state.region === 'builder-actions') {
        if (callbacks.onSelect) callbacks.onSelect({ type: 'builder-action', action: state.builderActionIndex });
      } else if (state.region === 'builder-slots') {
        if (callbacks.onSelect) callbacks.onSelect({ type: 'builder-slot-select', slotIndex: state.builderSlotIndex });
      }
    }
    emit();
  }

  function back() {
    if (state.screen === 'player') {
      state.screen = 'explore';
      state.region = 'show-tabs';
      if (callbacks.onBack) callbacks.onBack({ from: 'player' });
    } else if (state.screen === 'explore') {
      if (state.viewMode === 'show') {
        state.viewMode = 'featured';
        state.selectedShowIndex = 0;
        state.showTabIndex = 0;
        state.contentRow = 0;
        state.contentCol = 0;
        visitedRows.clear();
        savedContentRegion = 'show-tabs';
        if (callbacks.onBack) callbacks.onBack({ from: 'show-detail' });
      } else if (state.region === 'sidebar') {
        state.region = 'show-tabs';
      } else if (state.region === 'content') {
        state.region = 'show-tabs';
        state.showTabIndex = state.selectedShowIndex;
      }
    } else if (state.screen === 'search') {
      if (state.region === 'sidebar') {
        state.region = 'coming-soon';
      } else {
        state.screen = 'explore';
        state.region = 'show-tabs';
        if (callbacks.onBack) callbacks.onBack({ from: 'search' });
      }
    } else if (state.screen === 'settings') {
      if (state.region === 'sidebar') {
        state.region = 'coming-soon';
      } else {
        state.screen = 'explore';
        state.region = 'show-tabs';
        if (callbacks.onBack) callbacks.onBack({ from: 'settings' });
      }
    } else if (state.screen === 'builder') {
      state.screen = 'explore';
      state.region = 'show-tabs';
      if (callbacks.onBack) callbacks.onBack({ from: 'builder' });
    }
    emit();
  }

  // ── Builder slot cycling ─────────────────────────
  function cycleSlotOption(dir) {
    const si = state.builderSlotIndex;
    if (si === 0) {
      state.builderShowChoice = (state.builderShowChoice + dir + SHOWS.length) % SHOWS.length;
    } else if (si >= 1 && si <= 3) {
      const ci = si - 1;
      const total = CHARACTERS.length;
      let next = (state.builderCharChoices[ci] + dir + total) % total;
      let attempts = 0;
      while (attempts < total) {
        if (!state.builderCharChoices.some((v, idx) => idx !== ci && v === next)) break;
        next = (next + dir + total) % total;
        attempts++;
      }
      state.builderCharChoices[ci] = next;
    } else if (si === 4) {
      state.builderEnvChoice = (state.builderEnvChoice + dir + ENVIRONMENTS.length) % ENVIRONMENTS.length;
    }
  }

  // ── Keyboard listener ──────────────────────────────
  function handleKeyDown(e) {
    switch (e.key) {
      case 'ArrowUp':    e.preventDefault(); moveUp(); break;
      case 'ArrowDown':  e.preventDefault(); moveDown(); break;
      case 'ArrowLeft':  e.preventDefault(); moveLeft(); break;
      case 'ArrowRight': e.preventDefault(); moveRight(); break;
      case 'Enter':      e.preventDefault(); select(); break;
      case 'Escape':     e.preventDefault(); back(); break;
    }
  }

  return {
    GRID_COLS,
    SEARCH_RESULT_COLS,
    KEYBOARD_LAYOUT,
    KEYBOARD_SPECIAL_ROW,
    KEYBOARD_ROWS,

    init(cbs) {
      callbacks = cbs;
      document.addEventListener('keydown', handleKeyDown);
    },

    setScreen(screen) {
      state.screen = screen;
      if (screen === 'explore') {
        state.region = 'show-tabs';
        state.showTabIndex = state.selectedShowIndex || 0;
        state.contentRow = 0;
        state.contentCol = 0;
      } else if (screen === 'search') {
        state.region = 'coming-soon';
        state.sidebarIndex = 0;
      } else if (screen === 'settings') {
        state.region = 'coming-soon';
        state.sidebarIndex = 3;
      } else if (screen === 'builder') {
        state.region = 'builder-slots';
        state.builderSlotIndex = 0;
        state.builderActionIndex = 1;
        builderCameFromEnv = false;
      }
      emit();
    },

    goToPlayer() {
      state.screen = 'player';
      state.region = 'player-controls';
      state.playerControlIndex = 1;
      emit();
    },

    getState() { return { ...state }; },
    getContentLayout,

    setBuilderChoices({ show, chars, env }) {
      if (show !== undefined) state.builderShowChoice = show;
      if (chars !== undefined) state.builderCharChoices = [...chars];
      if (env !== undefined) state.builderEnvChoice = env;
      emit();
    },
  };
})();
