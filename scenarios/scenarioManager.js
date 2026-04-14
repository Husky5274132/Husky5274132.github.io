class ScenarioManager {
    constructor() {
        this.currentScenario = null;
        this.gameState = {};
    }

    loadScenario(scenarioName) {
        // For now, only sixDayWar
        if (scenarioName === 'sixDayWar') {
            this.currentScenario = new SixDayWarScenario();
        }
    }

    startScenario() {
        if (this.currentScenario) {
            this.currentScenario.start();
            return this.currentScenario.getInitialText();
        }
        return "No scenario loaded.";
    }

    processCommand(command) {
        if (this.currentScenario) {
            return this.currentScenario.processCommand(command);
        }
        return "No scenario loaded.";
    }
}