// Import the scenario manager and scenario
// Since ES6 modules, but for simplicity, assume global or load via script.

const scenarioManager = new ScenarioManager();

const debugLog = document.getElementById('debug-log');
const debugPanel = document.getElementById('debug-panel');
const toggleDebugBtn = document.getElementById('toggle-debug');
const logs = [];

function addLog(msg) {
    logs.push(msg);
    const line = document.createElement('div');
    line.textContent = msg;
    debugLog.appendChild(line);
    debugLog.parentElement.scrollTop = debugLog.parentElement.scrollHeight;
}

const originalLog = console.log;
console.log = function() {
    const args = Array.from(arguments);
    originalLog.apply(console, args);
    addLog(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
};

toggleDebugBtn.addEventListener('click', () => {
    const isHidden = debugPanel.style.display === 'none';
    debugPanel.style.display = isHidden ? 'block' : 'none';
    toggleDebugBtn.textContent = isHidden ? 'Hide Debug' : 'Show Debug';
});

const storyDiv = document.getElementById('story');
const turnInfo = document.getElementById('turn-info');
const actionsDiv = document.getElementById('actions');
const mainMenu = document.getElementById('main-menu');
const scenariosView = document.getElementById('scenarios-view');
const achievementsView = document.getElementById('achievements-view');
const gameUI = document.getElementById('game-ui');
const title = document.getElementById('title');
const browseBtn = document.getElementById('browse-scenarios');
const achievementsBtn = document.getElementById('achievements');
const scenarioSearch = document.getElementById('scenario-search');
const scenarioList = document.getElementById('scenario-list');
const achievementsList = document.getElementById('achievements-list');

const achievements = {
    diplomat: { name: 'Diplomat', description: 'Achieved peace through negotiation.', unlocked: false },
    conqueror: { name: 'Conqueror', description: 'Achieved full victory in the Six Day War.', unlocked: false },
    defender: { name: 'Defender', description: 'Held the line in a defensive posture.', unlocked: false },
    strategist: { name: 'Strategist', description: 'Made a preemptive strike.', unlocked: false },
    survivor: { name: 'Survivor', description: 'Ended in a stalemate or partial victory.', unlocked: false },
    researcher: { name: 'Researcher', description: 'Developed useful 1967 research progress.', unlocked: false }
};

function loadAchievements() {
    const saved = localStorage.getItem('warScenariosAchievements');
    if (saved) {
        const unlocked = JSON.parse(saved);
        Object.keys(unlocked).forEach(key => {
            if (achievements[key]) achievements[key].unlocked = unlocked[key];
        });
    }
}

function saveAchievements() {
    const unlocked = {};
    Object.keys(achievements).forEach(key => {
        unlocked[key] = achievements[key].unlocked;
    });
    localStorage.setItem('warScenariosAchievements', JSON.stringify(unlocked));
}

function unlockAchievement(key) {
    if (!achievements[key].unlocked) {
        achievements[key].unlocked = true;
        saveAchievements();
        alert(`Achievement Unlocked: ${achievements[key].name}`);
    }
}

function showMainMenu() {
    mainMenu.style.display = 'block';
    scenariosView.style.display = 'none';
    achievementsView.style.display = 'none';
    gameUI.style.display = 'none';
    title.style.display = 'block';
}

function showScenarios() {
    mainMenu.style.display = 'none';
    scenariosView.style.display = 'block';
    achievementsView.style.display = 'none';
    gameUI.style.display = 'none';
    title.style.display = 'none';
}

function showAchievements() {
    mainMenu.style.display = 'none';
    scenariosView.style.display = 'none';
    achievementsView.style.display = 'block';
    gameUI.style.display = 'none';
    title.style.display = 'none';
    renderAchievements();
}

function renderAchievements() {
    achievementsList.innerHTML = '';
    Object.keys(achievements).forEach(key => {
        const ach = achievements[key];
        const div = document.createElement('div');
        div.className = 'achievement ' + (ach.unlocked ? 'unlocked' : 'locked');
        div.innerHTML = `<h3>${ach.name}</h3><p>${ach.description}</p>`;
        achievementsList.appendChild(div);
    });
}

function filterScenarios() {
    const query = scenarioSearch.value.toLowerCase();
    const items = scenarioList.querySelectorAll('.scenario-item');
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? 'block' : 'none';
    });
}

let storyText = '';

function getActionLabel(actionKey) {
    return actionKey
        .replace(/_/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function updateUI() {
    console.log('[updateUI] State: ' + scenarioManager.currentScenario.state);
    storyDiv.textContent = storyText;
    storyDiv.scrollTop = storyDiv.scrollHeight;
    const currentState = scenarioManager.currentScenario.states[scenarioManager.currentScenario.state];
    console.log('[updateUI] Actions available: ' + (currentState.actions ? Object.keys(currentState.actions).join(', ') : 'none'));
    turnInfo.textContent = scenarioManager.currentScenario.getStatusText();
    actionsDiv.innerHTML = '';

    if (currentState.end) {
        const restartBtn = document.createElement('button');
        restartBtn.textContent = 'Restart Scenario';
        restartBtn.className = 'secondary';
        restartBtn.addEventListener('click', () => {
            storyText = scenarioManager.currentScenario.processCommand('restart');
            updateUI();
        });
        const backBtn = document.createElement('button');
        backBtn.textContent = 'Back to Menu';
        backBtn.className = 'secondary';
        backBtn.addEventListener('click', showMainMenu);
        actionsDiv.appendChild(restartBtn);
        actionsDiv.appendChild(backBtn);
        return;
    }

    const categories = currentState.actions || {};
    Object.keys(categories).forEach(category => {
        const actionGroup = document.createElement('div');
        actionGroup.className = 'action-group';
        const heading = document.createElement('h3');
        heading.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        actionGroup.appendChild(heading);

        Object.keys(categories[category]).forEach(actionKey => {
            const btn = document.createElement('button');
            btn.textContent = categories[category][actionKey];
            btn.addEventListener('click', () => {
                console.log('[Button Click] actionKey: ' + actionKey);
                const response = scenarioManager.processCommand(actionKey);
                console.log('[Button Click] response: ' + response.slice(0, 100));
                storyText += '\n\n> ' + getActionLabel(actionKey) + '\n' + response;
                if (actionKey === 'peace_talks' || actionKey === 'alliances' || actionKey === 'diplomacy_meetings') {
                    unlockAchievement('diplomat');
                }
                if (actionKey === 'attack') {
                    unlockAchievement('strategist');
                }
                if (actionKey === 'defend') {
                    unlockAchievement('defender');
                }
                if (actionKey === 'intelligence' || actionKey === 'logistics' || actionKey === 'technology') {
                    unlockAchievement('researcher');
                }
                updateUI();
            });
            actionGroup.appendChild(btn);
        });

        actionsDiv.appendChild(actionGroup);
    });
}

browseBtn.addEventListener('click', showScenarios);
achievementsBtn.addEventListener('click', showAchievements);
scenarioSearch.addEventListener('input', filterScenarios);

scenarioList.addEventListener('click', (e) => {
    if (e.target.classList.contains('start-scenario')) {
        const scenario = e.target.closest('.scenario-item').dataset.scenario;
        console.log('[Start Scenario] ' + scenario);
        scenarioManager.loadScenario(scenario);
        storyText = scenarioManager.startScenario();
        console.log('[Start Scenario] Loaded, text: ' + storyText.slice(0, 80));
        mainMenu.style.display = 'none';
        scenariosView.style.display = 'none';
        achievementsView.style.display = 'none';
        gameUI.style.display = 'block';
        title.style.display = 'none';
        updateUI();
    }
});

loadAchievements();
console.log('[Init] Game loaded');
showMainMenu();
showMainMenu();