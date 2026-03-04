document.addEventListener('DOMContentLoaded', () => {
    const ws = new WebSocket('ws://localhost:8001/SimiaAgent');
    const messageList = document.getElementById('message-list');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const clearButton = document.getElementById('clear-button');
    const generateShowButton = document.getElementById('generate-show-button');
    const playShowButton = document.getElementById('play-show-button');
    const socialStreamButton = document.getElementById('live-stream-button');
    const stopShowButton = document.getElementById('stop-show-button');
    const statusText = document.getElementById('status-text');
    
    // Show templates elements
    const templatesDropdownBtn = document.getElementById('templates-dropdown-btn');
    const templatesDropdown = document.getElementById('templates-dropdown');
    const templatesDropdownContent = document.getElementById('templates-dropdown-content');
    const templatesLoading = document.getElementById('templates-loading');

    // UI Controls elements
    const uiToggleSwitch = document.getElementById('ui-toggle-switch');
    const uiToggleLabel = document.getElementById('ui-toggle-label');
    const appElement = document.getElementById('app');

    // TikTok Controls elements
    const tiktokUserIdInput = document.getElementById('tiktok-user-id');
    const tiktokRoomIdInput = document.getElementById('tiktok-room-id');
    const tiktokStartButton = document.getElementById('tiktok-start-button');
    const tiktokStopButton = document.getElementById('tiktok-stop-button');
    const tiktokStatusText = document.getElementById('tiktok-status-text');
    const tiktokToggleButton = document.getElementById('tiktok-toggle-button');
    const tiktokContent = document.getElementById('tiktok-content');
    const tiktokHeader = document.getElementById('tiktok-header');

    // Twitch Controls elements
    const twitchChannelInput = document.getElementById('twitch-channel');
    const twitchUsernameInput = document.getElementById('twitch-username');
    const twitchAccessTokenInput = document.getElementById('twitch-access-token');
    const twitchStartButton = document.getElementById('twitch-start-button');
    const twitchStopButton = document.getElementById('twitch-stop-button');
    const twitchStatusText = document.getElementById('twitch-status-text');
    const twitchToggleButton = document.getElementById('twitch-toggle-button');
    const twitchContent = document.getElementById('twitch-content');
    const twitchHeader = document.getElementById('twitch-header');

    // Subtitle Controls elements
    const subtitleAnimationMode = document.getElementById('subtitle-animation-mode');
    const subtitleWordTimingEnabled = document.getElementById('subtitle-word-timing-enabled');
    const subtitlePunchyAnimation = document.getElementById('subtitle-punchy-animation');
    const subtitlePunchScale = document.getElementById('subtitle-punch-scale');
    const subtitlePunchScaleValue = document.getElementById('subtitle-punch-scale-value');
    const subtitleWordHighlight = document.getElementById('subtitle-word-highlight');
    const subtitleHighlightColor = document.getElementById('subtitle-highlight-color');
    const subtitleHighlightDuration = document.getElementById('subtitle-highlight-duration');
    const subtitleHighlightDurationValue = document.getElementById('subtitle-highlight-duration-value');
    const subtitleMaxDuration = document.getElementById('subtitle-max-duration');
    const subtitleMaxDurationValue = document.getElementById('subtitle-max-duration-value');
    const subtitleApplyButton = document.getElementById('subtitle-apply-button');
    const subtitleStatusText = document.getElementById('subtitle-status-text');
    const subtitleToggleButton = document.getElementById('subtitle-toggle-button');
    const subtitleContent = document.getElementById('subtitle-content');
    const subtitleHeader = document.getElementById('subtitle-header');

    // Debug logging
    console.log('UI Toggle Elements:', {
        uiToggleSwitch,
        uiToggleLabel,
        appElement
    });

    console.log('TikTok Control Elements:', {
        tiktokUserIdInput,
        tiktokRoomIdInput,
        tiktokStartButton,
        tiktokStopButton,
        tiktokStatusText,
        tiktokToggleButton,
        tiktokContent,
        tiktokHeader
    });

    console.log('Twitch Control Elements:', {
        twitchChannelInput,
        twitchUsernameInput,
        twitchAccessTokenInput,
        twitchStartButton,
        twitchStopButton,
        twitchStatusText,
        twitchToggleButton,
        twitchContent,
        twitchHeader
    });

    console.log('Subtitle Control Elements:', {
        subtitleAnimationMode,
        subtitleWordTimingEnabled,
        subtitlePunchyAnimation,
        subtitlePunchScale,
        subtitleWordHighlight,
        subtitleHighlightColor,
        subtitleMaxWords,
        subtitleApplyButton,
        subtitleToggleButton,
        subtitleContent,
        subtitleHeader
    });

    let showTemplates = [];
    let isInitialConnection = true;

    function setStatus(status) {
        statusText.textContent = status;
        statusText.className = status;
    }

    function addMessage(role, content) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', (role || 'unknown').toLowerCase());
        
        const roleDiv = document.createElement('div');
        roleDiv.classList.add('message-role');
        roleDiv.textContent = role;
        
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        contentDiv.textContent = content || '[No Content]';

        messageDiv.appendChild(roleDiv);
        messageDiv.appendChild(contentDiv);
        messageList.appendChild(messageDiv);
        messageList.scrollTop = messageList.scrollHeight;
    }

    function addVideoMessage(videoPath) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'video');
        
        const roleDiv = document.createElement('div');
        roleDiv.classList.add('message-role');
        roleDiv.textContent = 'Generated Video';
        
        const videoDiv = document.createElement('div');
        videoDiv.classList.add('message-content');
        
        const video = document.createElement('video');
        video.src = videoPath;
        video.controls = true;
        video.style.maxWidth = '100%';
        video.style.borderRadius = '8px';
        
        videoDiv.appendChild(video);
        messageDiv.appendChild(roleDiv);
        messageDiv.appendChild(videoDiv);
        messageList.appendChild(messageDiv);
        messageList.scrollTop = messageList.scrollHeight;
    }

    function updateMessageList(messages) {
        messageList.innerHTML = '';
        if (messages) {
            messages.forEach(msg => {
                addMessage(msg.role, msg.content);
            });
        }
    }

    function sendMessage() {
        const text = messageInput.value.trim();
        if (text && ws.readyState === WebSocket.OPEN) {
            const clientMessage = {
                command: 'send_chat',
                payload: text
            };
            ws.send(JSON.stringify(clientMessage));
            messageInput.value = '';
        }
    }

    function clearMessages() {
        if (ws.readyState === WebSocket.OPEN) {
            const clientMessage = {
                command: 'clear_messages',
                payload: ''
            };
            ws.send(JSON.stringify(clientMessage));
        }
    }

    function generateShow() {
        if (ws.readyState === WebSocket.OPEN) {
            const clientMessage = {
                command: 'generate_show',
                payload: ''
            };
            ws.send(JSON.stringify(clientMessage));
        }
    }

    function playShow() {
        if (ws.readyState === WebSocket.OPEN) {
            const clientMessage = {
                command: 'play_show',
                payload: ''
            };
            ws.send(JSON.stringify(clientMessage));
        }
    }

    function startSocialStream() {
        if (ws.readyState === WebSocket.OPEN) {
            const clientMessage = {
                command: 'start_live_stream',
                payload: ''
            };
            ws.send(JSON.stringify(clientMessage));
        }
    }

    function stopShow() {
        if (ws.readyState === WebSocket.OPEN) {
            const clientMessage = {
                command: 'stop_show',
                payload: ''
            };
            ws.send(JSON.stringify(clientMessage));
        }
    }

    // Show Templates Functions
    async function loadShowTemplates() {
        try {
            templatesLoading.textContent = 'Loading templates...';
            templatesLoading.style.display = 'block';
            
            const response = await fetch('/api/show-templates');
            if (response.ok) {
                showTemplates = await response.json();
                console.log(`Loaded ${showTemplates.length} show templates`);
                renderShowTemplates();
            } else {
                console.error('Failed to load show templates');
                templatesLoading.textContent = 'Failed to load templates';
            }
        } catch (error) {
            console.error('Error loading show templates:', error);
            templatesLoading.textContent = 'Error loading templates';
        }
    }

    function renderShowTemplates() {
        templatesDropdownContent.innerHTML = '';
        templatesLoading.style.display = 'none';
        
        if (showTemplates.length === 0) {
            const noTemplates = document.createElement('div');
            noTemplates.style.padding = '20px';
            noTemplates.style.textAlign = 'center';
            noTemplates.style.color = '#aaa';
            noTemplates.textContent = 'No templates available';
            templatesDropdownContent.appendChild(noTemplates);
            return;
        }

        showTemplates.forEach(template => {
            const templateItem = document.createElement('div');
            templateItem.className = 'template-item';
            templateItem.setAttribute('data-template-id', template.id);
            
            const templateIcon = document.createElement('div');
            templateIcon.className = 'template-icon';
            
            // Use the show template icon from the API endpoint
            const iconUrl = `/api/show-icons/${template.id}.png`;
            
            const img = document.createElement('img');
            img.src = iconUrl;
            img.alt = template.title;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.onerror = () => {
                // Replace with placeholder text on error
                templateIcon.innerHTML = '';
                templateIcon.textContent = template.title.charAt(0).toUpperCase();
                templateIcon.style.display = 'flex';
                templateIcon.style.alignItems = 'center';
                templateIcon.style.justifyContent = 'center';
                templateIcon.style.fontSize = '18px';
                templateIcon.style.fontWeight = 'bold';
                templateIcon.style.color = '#007acc';
            };
            templateIcon.appendChild(img);
            
            const templateInfo = document.createElement('div');
            templateInfo.className = 'template-info';
            
            const templateTitle = document.createElement('div');
            templateTitle.className = 'template-title';
            templateTitle.textContent = template.title;
            
            const templateDescription = document.createElement('div');
            templateDescription.className = 'template-description';
            templateDescription.textContent = template.description || 'No description available';
            
            templateInfo.appendChild(templateTitle);
            templateInfo.appendChild(templateDescription);
            
            templateItem.appendChild(templateIcon);
            templateItem.appendChild(templateInfo);
            
            if (template.isStudio) {
                const badge = document.createElement('span');
                badge.className = 'template-badge';
                badge.textContent = 'Studio';
                templateItem.appendChild(badge);
            }
            
            templateItem.addEventListener('click', () => {
                selectShowTemplate(template);
            });
            
            templatesDropdownContent.appendChild(templateItem);
        });
    }

    function selectShowTemplate(template) {
        // Close dropdown
        templatesDropdown.classList.remove('active');
        
        // Update button text
        templatesDropdownBtn.textContent = template.title;
        
        // Send command to select template (message will be shown by the backend)
        if (ws.readyState === WebSocket.OPEN) {
            const clientMessage = {
                command: 'select_show_template',
                payload: template.id
            };
            ws.send(JSON.stringify(clientMessage));
        }
    }

    function toggleTemplatesDropdown() {
        templatesDropdown.classList.toggle('active');
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
        if (!templatesDropdown.contains(event.target)) {
            templatesDropdown.classList.remove('active');
        }
    });

    // TikTok Controls Functions
    function startTikTokEventHandler() {
        const userId = tiktokUserIdInput.value.trim();
        const roomId = tiktokRoomIdInput.value.trim();
        
        if (!userId && !roomId) {
            addMessage('system', '❌ Please enter either a User ID or Room ID for TikTok connection.');
            return;
        }
        
        if (ws.readyState !== WebSocket.OPEN) {
            addMessage('system', '❌ WebSocket not connected. Cannot start TikTok Event Handler.');
            return;
        }
        
        // Save credentials for next time
        saveTikTokCredentials();
        
        const clientMessage = {
            command: 'start_tiktok_handler',
            payload: JSON.stringify({
                userId: userId || null,
                roomId: roomId || null
            })
        };
        ws.send(JSON.stringify(clientMessage));
        
        // Update UI state
        setTikTokStatus('connecting');
        tiktokStartButton.disabled = true;
        tiktokStopButton.disabled = false;
        
        const connectionInfo = userId ? `User ID: ${userId}` : `Room ID: ${roomId}`;
        addMessage('system', `🚀 Starting TikTok Event Handler with ${connectionInfo}...`);
    }
    
    function stopTikTokEventHandler() {
        if (ws.readyState !== WebSocket.OPEN) {
            addMessage('system', '❌ WebSocket not connected. Cannot stop TikTok Event Handler.');
            return;
        }
        
        const clientMessage = {
            command: 'stop_tiktok_handler',
            payload: ''
        };
        ws.send(JSON.stringify(clientMessage));
        
        // Update UI state
        setTikTokStatus('disconnected');
        tiktokStartButton.disabled = false;
        tiktokStopButton.disabled = true;
        
        addMessage('system', '⏹️ Stopping TikTok Event Handler...');
    }
    
    function setTikTokStatus(status) {
        // Remove all status classes
        tiktokStatusText.classList.remove('connected', 'connecting', 'disconnected');
        
        switch (status.toLowerCase()) {
            case 'connected':
                tiktokStatusText.textContent = 'Connected';
                tiktokStatusText.classList.add('connected');
                tiktokStartButton.disabled = true;
                tiktokStopButton.disabled = false;
                break;
            case 'connecting':
                tiktokStatusText.textContent = 'Connecting...';
                tiktokStatusText.classList.add('connecting');
                tiktokStartButton.disabled = true;
                tiktokStopButton.disabled = false;
                break;
            case 'disconnected':
            default:
                tiktokStatusText.textContent = 'Disconnected';
                tiktokStatusText.classList.add('disconnected');
                tiktokStartButton.disabled = false;
                tiktokStopButton.disabled = true;
                break;
        }
    }
    
    function requestTikTokStatus() {
        if (ws.readyState === WebSocket.OPEN) {
            const clientMessage = {
                command: 'get_tiktok_status',
                payload: ''
            };
            ws.send(JSON.stringify(clientMessage));
            console.log('Requested TikTok status from Unity');
        }
    }
    
    function saveTikTokCredentials() {
        const userId = tiktokUserIdInput.value.trim();
        const roomId = tiktokRoomIdInput.value.trim();
        
        localStorage.setItem('tiktok-user-id', userId);
        localStorage.setItem('tiktok-room-id', roomId);
    }
    
    function loadTikTokCredentials() {
        const savedUserId = localStorage.getItem('tiktok-user-id');
        const savedRoomId = localStorage.getItem('tiktok-room-id');
        
        if (savedUserId) {
            tiktokUserIdInput.value = savedUserId;
        }
        if (savedRoomId) {
            tiktokRoomIdInput.value = savedRoomId;
        }
    }

    // Twitch Controls Functions
    function startTwitchEventHandler() {
        const channel = twitchChannelInput.value.trim();
        const username = twitchUsernameInput.value.trim();
        const accessToken = twitchAccessTokenInput.value.trim();
        
        if (!channel || !username || !accessToken) {
            addMessage('system', '❌ Please enter Channel Name, Username, and Access Token for Twitch connection.');
            return;
        }
        
        if (ws.readyState !== WebSocket.OPEN) {
            addMessage('system', '❌ WebSocket not connected. Cannot start Twitch Event Handler.');
            return;
        }
        
        // Save credentials for next time
        saveTwitchCredentials();
        
        const clientMessage = {
            command: 'start_twitch_handler',
            payload: JSON.stringify({
                channelName: channel,
                username: username,
                accessToken: accessToken
            })
        };
        ws.send(JSON.stringify(clientMessage));
        
        // Update UI state
        setTwitchStatus('connecting');
        twitchStartButton.disabled = true;
        twitchStopButton.disabled = false;
        
        addMessage('system', `🚀 Starting Twitch Event Handler for channel: ${channel}...`);
    }
    
    function stopTwitchEventHandler() {
        if (ws.readyState !== WebSocket.OPEN) {
            addMessage('system', '❌ WebSocket not connected. Cannot stop Twitch Event Handler.');
            return;
        }
        
        const clientMessage = {
            command: 'stop_twitch_handler',
            payload: ''
        };
        ws.send(JSON.stringify(clientMessage));
        
        // Update UI state
        setTwitchStatus('disconnected');
        twitchStartButton.disabled = false;
        twitchStopButton.disabled = true;
        
        addMessage('system', '⏹️ Stopping Twitch Event Handler...');
    }
    
    function setTwitchStatus(status) {
        // Remove all status classes
        twitchStatusText.classList.remove('connected', 'connecting', 'disconnected');
        
        switch (status.toLowerCase()) {
            case 'connected':
                twitchStatusText.textContent = 'Connected';
                twitchStatusText.classList.add('connected');
                twitchStartButton.disabled = true;
                twitchStopButton.disabled = false;
                break;
            case 'connecting':
                twitchStatusText.textContent = 'Connecting...';
                twitchStatusText.classList.add('connecting');
                twitchStartButton.disabled = true;
                twitchStopButton.disabled = false;
                break;
            case 'disconnected':
            default:
                twitchStatusText.textContent = 'Disconnected';
                twitchStatusText.classList.add('disconnected');
                twitchStartButton.disabled = false;
                twitchStopButton.disabled = true;
                break;
        }
    }
    
    function requestTwitchStatus() {
        if (ws.readyState === WebSocket.OPEN) {
            const clientMessage = {
                command: 'request_twitch_status',
                payload: ''
            };
            ws.send(JSON.stringify(clientMessage));
            console.log('Requested Twitch status from Unity');
        }
    }
    
    function saveTwitchCredentials() {
        const channel = twitchChannelInput.value.trim();
        const username = twitchUsernameInput.value.trim();
        const accessToken = twitchAccessTokenInput.value.trim();
        
        localStorage.setItem('twitch-channel', channel);
        localStorage.setItem('twitch-username', username);
        localStorage.setItem('twitch-access-token', accessToken);
    }
    
    function loadTwitchCredentials() {
        const savedChannel = localStorage.getItem('twitch-channel');
        const savedUsername = localStorage.getItem('twitch-username');
        const savedAccessToken = localStorage.getItem('twitch-access-token');
        
        if (savedChannel) {
            twitchChannelInput.value = savedChannel;
        }
        if (savedUsername) {
            twitchUsernameInput.value = savedUsername;
        }
        if (savedAccessToken) {
            twitchAccessTokenInput.value = savedAccessToken;
        }
    }

    // UI Visibility Functions
    function updateUIVisibility() {
        console.log('updateUIVisibility called');
        
        if (!uiToggleSwitch) {
            console.error('uiToggleSwitch not found!');
            return;
        }
        
        const isUIVisible = uiToggleSwitch.checked;
        console.log('Unity UI should be visible:', isUIVisible);
        
        // Update the label
        if (uiToggleLabel) {
            uiToggleLabel.textContent = isUIVisible ? 'Show' : 'Hide';
        }
        
        // Send command to Unity to show/hide the UI
        if (ws.readyState === WebSocket.OPEN) {
            const clientMessage = {
                command: 'toggle_unity_ui',
                payload: isUIVisible.toString()
            };
            ws.send(JSON.stringify(clientMessage));
            console.log('Sent Unity UI toggle command:', isUIVisible);
        } else {
            console.warn('WebSocket not connected - cannot send Unity UI command');
        }
        
        // Save preference to localStorage
        localStorage.setItem('simia-unity-ui-visible', isUIVisible.toString());
        console.log('Saved Unity UI preference to localStorage:', isUIVisible.toString());
    }

    function loadUIVisibilityPreference() {
        // Set initial state to loading
        if (uiToggleLabel) {
            uiToggleLabel.textContent = 'Loading...';
        }
        
        console.log('Loading Unity UI preference...');
        
        // Request current Unity UI state from Unity when WebSocket is ready
        if (ws.readyState === WebSocket.OPEN) {
            requestUnityUIState();
        }
    }

    function requestUnityUIState() {
        if (ws.readyState === WebSocket.OPEN) {
            const clientMessage = {
                command: 'get_unity_ui_state',
                payload: ''
            };
            ws.send(JSON.stringify(clientMessage));
            console.log('Requested Unity UI state from Unity');
        }
    }

    function setUnityUIState(isVisible) {
        if (uiToggleSwitch) {
            uiToggleSwitch.checked = isVisible;
        }
        
        if (uiToggleLabel) {
            uiToggleLabel.textContent = isVisible ? 'Show' : 'Hide';
        }
        
        // Update localStorage to match Unity state
        localStorage.setItem('simia-unity-ui-visible', isVisible.toString());
        console.log('Updated UI toggle to match Unity state:', isVisible);
    }

    // Load UI visibility preference on page load
    loadUIVisibilityPreference();

    // UI toggle event listener
    console.log('Adding event listener to toggle switch');
    if (uiToggleSwitch) {
        uiToggleSwitch.addEventListener('change', function(event) {
            console.log('Toggle switch changed!', event.target.checked);
            updateUIVisibility();
        });
        
        // Also add click listener for debugging
        uiToggleSwitch.addEventListener('click', function(event) {
            console.log('Toggle switch clicked!', event.target.checked);
        });
        
        console.log('Event listeners added successfully');
    } else {
        console.error('Could not add event listener - uiToggleSwitch not found');
    }

    // Load show templates on page load (regardless of WebSocket status)
    loadShowTemplates();

    ws.onopen = () => {
        console.log('Connected to SimiaAgent WebSocket');
        setStatus('Connected');
        // Request message history on reconnect
        const requestHistory = {
            command: 'get_messages',
            payload: ''
        };
        ws.send(JSON.stringify(requestHistory));

        // Load show templates on connect
        loadShowTemplates();
        
        // Request current Unity UI state
        requestUnityUIState();
        
        // Request current TikTok status
        requestTikTokStatus();
        
        // Request current Twitch status
        requestTwitchStatus();
        
        // Automatically load subtitle configuration
        if (isInitialConnection) {
            setSubtitleStatus('Loading initial configuration...');
            isInitialConnection = false;
        } else {
            setSubtitleStatus('Reconnected - synchronizing configuration...');
        }
        sendSubtitleCommand('subtitle_get_configuration');
    };

    ws.onmessage = (event) => {
        const serverMessage = JSON.parse(event.data);
        switch (serverMessage.type) {
            case 'message_list_updated':
                updateMessageList(serverMessage.data);
                break;
            case 'status_changed':
                setStatus(serverMessage.data);
                break;
            case 'show_action':
                addMessage('system', serverMessage.data.message);
                console.log('Show action:', serverMessage.data.action);
                break;
            case 'video_generated':
                addVideoMessage(serverMessage.data.videoPath);
                break;
            case 'unity_ui_state':
                // Update toggle to match Unity's current UI state
                setUnityUIState(serverMessage.data.isVisible);
                break;
            case 'tiktok_status':
                // Handle TikTok status updates
                setTikTokStatus(serverMessage.data.status);
                if (serverMessage.data.message) {
                    addMessage('system', serverMessage.data.message);
                }
                console.log('TikTok status:', serverMessage.data.status);
                break;
            case 'twitch_status':
                // Handle Twitch status updates
                setTwitchStatus(serverMessage.data.status);
                if (serverMessage.data.message) {
                    addMessage('system', serverMessage.data.message);
                }
                console.log('Twitch status:', serverMessage.data.status);
                break;
            case 'subtitle_config_update':
                // Handle subtitle configuration updates and automatically refresh configuration
                setSubtitleStatus('Synchronizing configuration...');
                console.log('Subtitle config update:', serverMessage.data.action);
                
                // Automatically request updated configuration
                sendSubtitleCommand('subtitle_get_configuration');
                break;
            case 'subtitle_configuration':
                // Handle full subtitle configuration response
                updateSubtitleConfigUI(serverMessage.data);
                setSubtitleStatus('Configuration synchronized');
                console.log('Subtitle configuration received:', serverMessage.data);
                break;
            case 'subtitle_error':
                // Handle subtitle errors
                setSubtitleStatus(serverMessage.data.error + ': ' + serverMessage.data.details, true);
                console.error('Subtitle error:', serverMessage.data);
                break;
            case 'server_shutdown':
                addMessage('system', 'Unity application is shutting down. Connection will be lost.');
                setStatus('Unity Shutting Down');
                break;
            default:
                console.log('Unknown message type:', serverMessage.type);
        }
    };

    ws.onclose = () => {
        console.log('Disconnected from SimiaAgent WebSocket');
        setStatus('Disconnected');
    };

    ws.onerror = (error) => {
        console.error('WebSocket Error:', error);
        setStatus('Error');
    };

    sendButton.addEventListener('click', sendMessage);
    clearButton.addEventListener('click', clearMessages);
    generateShowButton.addEventListener('click', generateShow);
    playShowButton.addEventListener('click', playShow);
    socialStreamButton.addEventListener('click', startSocialStream);
    stopShowButton.addEventListener('click', stopShow);
    
    // Templates dropdown event listener
    templatesDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleTemplatesDropdown();
    });
    
    // TikTok event listeners
    tiktokStartButton.addEventListener('click', startTikTokEventHandler);
    tiktokStopButton.addEventListener('click', stopTikTokEventHandler);
    
    // TikTok collapsible panel toggle
    tiktokToggleButton.addEventListener('click', () => {
        tiktokContent.classList.toggle('collapsed');
        // Update button arrow direction
        if (tiktokContent.classList.contains('collapsed')) {
            tiktokToggleButton.textContent = '▶';
            tiktokToggleButton.title = 'Expand TikTok Controls';
        } else {
            tiktokToggleButton.textContent = '▼';
            tiktokToggleButton.title = 'Collapse TikTok Controls';
        }
    });
    
    // Allow pressing Enter to start TikTok connection
    tiktokUserIdInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !tiktokStartButton.disabled) {
            startTikTokEventHandler();
        }
    });
    
    tiktokRoomIdInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !tiktokStartButton.disabled) {
            startTikTokEventHandler();
        }
    });
    
    // Save credentials when input changes
    tiktokUserIdInput.addEventListener('input', saveTikTokCredentials);
    tiktokRoomIdInput.addEventListener('input', saveTikTokCredentials);
    
    // Initialize TikTok status
    setTikTokStatus('disconnected');
    
    // Load saved TikTok credentials
    loadTikTokCredentials();
    
    // Twitch event listeners
    twitchStartButton.addEventListener('click', startTwitchEventHandler);
    twitchStopButton.addEventListener('click', stopTwitchEventHandler);
    
    // Twitch collapsible panel toggle
    twitchToggleButton.addEventListener('click', () => {
        twitchContent.classList.toggle('collapsed');
        // Update button arrow direction
        if (twitchContent.classList.contains('collapsed')) {
            twitchToggleButton.textContent = '▶';
            twitchToggleButton.title = 'Expand Twitch Controls';
        } else {
            twitchToggleButton.textContent = '▼';
            twitchToggleButton.title = 'Collapse Twitch Controls';
        }
    });
    
    // Allow pressing Enter to start Twitch connection
    twitchChannelInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !twitchStartButton.disabled) {
            startTwitchEventHandler();
        }
    });
    
    twitchUsernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !twitchStartButton.disabled) {
            startTwitchEventHandler();
        }
    });
    
    twitchAccessTokenInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !twitchStartButton.disabled) {
            startTwitchEventHandler();
        }
    });
    
    // Save credentials when input changes
    twitchChannelInput.addEventListener('input', saveTwitchCredentials);
    twitchUsernameInput.addEventListener('input', saveTwitchCredentials);
    twitchAccessTokenInput.addEventListener('input', saveTwitchCredentials);
    
    // Initialize Twitch status
    setTwitchStatus('disconnected');
    
    // Load saved Twitch credentials
    loadTwitchCredentials();

    // Subtitle Controls Functions
    function setSubtitleStatus(status, isError = false) {
        subtitleStatusText.textContent = status;
        subtitleStatusText.className = isError ? 'error' : 'working';
        
        // Clear status after 3 seconds if not an error
        if (!isError) {
            setTimeout(() => {
                subtitleStatusText.textContent = 'Ready';
                subtitleStatusText.className = '';
            }, 3000);
        }
    }

    function updateSliderValues() {
        if (subtitlePunchScaleValue) {
            subtitlePunchScaleValue.textContent = subtitlePunchScale.value;
        }
        if (subtitleHighlightDurationValue) {
            subtitleHighlightDurationValue.textContent = subtitleHighlightDuration.value;
        }
        if (subtitleMaxDurationValue) {
            subtitleMaxDurationValue.textContent = subtitleMaxDuration.value + 's';
        }
    }

    function hexToRgba(hex) {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;
        return { r, g, b, a: 1.0 };
    }

    function sendSubtitleCommand(command, payload = {}) {
        if (ws && ws.readyState === WebSocket.OPEN) {
            const message = JSON.stringify({
                command: command,
                payload: JSON.stringify(payload)
            });
            ws.send(message);
            console.log('Sent subtitle command:', command, payload);
        } else {
            setSubtitleStatus('Not connected to Unity', true);
        }
    }

    function applySubtitleSettings() {
        const config = {
            animationMode: subtitleAnimationMode.value,
            enableWordTimingAnimations: subtitleWordTimingEnabled.checked,
            enablePunchyAnimation: subtitlePunchyAnimation.checked,
            enableWordHighlight: subtitleWordHighlight.checked,
            highlightColor: hexToRgba(subtitleHighlightColor.value),
            punchScale: parseFloat(subtitlePunchScale.value),
            highlightDuration: parseFloat(subtitleHighlightDuration.value),
            maxVisibleDuration: parseFloat(subtitleMaxDuration.value)
        };
        
        setSubtitleStatus('Applying configuration...');
        
        sendSubtitleCommand('subtitle_apply_configuration', config);
    }

    function updateSubtitleConfigUI(config) {
        if (config.animationMode && subtitleAnimationMode) {
            subtitleAnimationMode.value = config.animationMode;
        }
        if (typeof config.enableWordTimingAnimations === 'boolean' && subtitleWordTimingEnabled) {
            subtitleWordTimingEnabled.checked = config.enableWordTimingAnimations;
        }
        if (typeof config.enablePunchyAnimation === 'boolean' && subtitlePunchyAnimation) {
            subtitlePunchyAnimation.checked = config.enablePunchyAnimation;
        }
        if (typeof config.enableWordHighlight === 'boolean' && subtitleWordHighlight) {
            subtitleWordHighlight.checked = config.enableWordHighlight;
        }
        if (config.punchScale && subtitlePunchScale) {
            subtitlePunchScale.value = config.punchScale;
        }
        if (config.highlightDuration && subtitleHighlightDuration) {
            subtitleHighlightDuration.value = config.highlightDuration;
        }
        if (config.maxVisibleDuration && subtitleMaxDuration) {
            subtitleMaxDuration.value = config.maxVisibleDuration;
        }
        if (config.highlightColor && subtitleHighlightColor) {
            const color = config.highlightColor;
            const hex = '#' + 
                Math.round(color.r * 255).toString(16).padStart(2, '0') +
                Math.round(color.g * 255).toString(16).padStart(2, '0') +
                Math.round(color.b * 255).toString(16).padStart(2, '0');
            subtitleHighlightColor.value = hex;
        }
        updateSliderValues();
    }

    // Subtitle event listeners
    if (subtitleToggleButton && subtitleContent) {
        subtitleToggleButton.addEventListener('click', () => {
            subtitleContent.classList.toggle('collapsed');
            // Update button arrow direction
            if (subtitleContent.classList.contains('collapsed')) {
                subtitleToggleButton.textContent = '▶';
                subtitleToggleButton.title = 'Expand Subtitle Controls';
            } else {
                subtitleToggleButton.textContent = '▼';
                subtitleToggleButton.title = 'Collapse Subtitle Controls';
            }
        });
    }

    if (subtitleApplyButton) {
        subtitleApplyButton.addEventListener('click', applySubtitleSettings);
    }

    // Real-time slider value updates
    if (subtitlePunchScale && subtitlePunchScaleValue) {
        subtitlePunchScale.addEventListener('input', updateSliderValues);
    }

    if (subtitleHighlightDuration && subtitleHighlightDurationValue) {
        subtitleHighlightDuration.addEventListener('input', updateSliderValues);
    }

    if (subtitleMaxDuration && subtitleMaxDurationValue) {
        subtitleMaxDuration.addEventListener('input', updateSliderValues);
    }

    // Individual setting change handlers
    if (subtitleAnimationMode) {
        subtitleAnimationMode.addEventListener('change', () => {
            sendSubtitleCommand('subtitle_set_animation_mode', {
                mode: subtitleAnimationMode.value
            });
        });
    }

    if (subtitleWordTimingEnabled) {
        subtitleWordTimingEnabled.addEventListener('change', () => {
            sendSubtitleCommand('subtitle_set_word_timing_enabled', {
                enabled: subtitleWordTimingEnabled.checked
            });
        });
    }

    if (subtitlePunchyAnimation) {
        subtitlePunchyAnimation.addEventListener('change', () => {
            sendSubtitleCommand('subtitle_set_punchy_animation', {
                enabled: subtitlePunchyAnimation.checked
            });
        });
    }

    if (subtitlePunchScale) {
        subtitlePunchScale.addEventListener('change', () => {
            sendSubtitleCommand('subtitle_set_punch_scale', {
                scale: parseFloat(subtitlePunchScale.value)
            });
        });
    }

    if (subtitleHighlightDuration) {
        subtitleHighlightDuration.addEventListener('change', () => {
            sendSubtitleCommand('subtitle_set_highlight_duration', {
                duration: parseFloat(subtitleHighlightDuration.value)
            });
        });
    }

    if (subtitleWordHighlight || subtitleHighlightColor) {
        function updateWordHighlight() {
            const enabled = subtitleWordHighlight ? subtitleWordHighlight.checked : true;
            const color = subtitleHighlightColor ? hexToRgba(subtitleHighlightColor.value) : { r: 1, g: 1, b: 0, a: 1 };
            const duration = subtitleHighlightDuration ? parseFloat(subtitleHighlightDuration.value) : 0.3;
            
            sendSubtitleCommand('subtitle_set_word_highlight', {
                enabled: enabled,
                color: color,
                duration: duration
            });
        }

        if (subtitleWordHighlight) {
            subtitleWordHighlight.addEventListener('change', updateWordHighlight);
        }
        if (subtitleHighlightColor) {
            subtitleHighlightColor.addEventListener('change', updateWordHighlight);
        }
    }

    // Initialize subtitle slider values
    updateSliderValues();

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
