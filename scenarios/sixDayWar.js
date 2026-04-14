class SixDayWarScenario {
    constructor() {
        this.state = 'start';
        this.turn = 1;
        this.actionsTaken = 0;
        this.researchProgress = {
            intelligence: 0,
            logistics: 0,
            technology: 0
        };

        this.defaultActions = {
            military: {
                attack: 'Attack',
                defend: 'Defend',
                recruit: 'Recruit',
                position: 'Position'
            },
            diplomacy: {
                peace_talks: 'Peace Talks',
                alliances: 'Alliances',
                diplomacy_meetings: 'Diplomacy Meetings'
            },
            research: {
                intelligence: 'Intelligence',
                logistics: 'Logistics',
                technology: 'Technology'
            }
        };

        this.states = {
            start: {
                text: "June 5, 1967. Israel faces a historic crisis. Egyptian forces have mobilized, Syria is threatening from the north, and Jordan is ready to advance. Choose your path carefully: military action, diplomatic leverage, or research support.",
                actions: this.defaultActions
            },
            airStrike: {
                text: "You commit to a preemptive military strike. The air campaign shatters Egyptian air power. The decision is bold, but the risk is high. Continue to press your tactical advantage or stabilize the front.",
                actions: this.defaultActions
            },
            prepareDefense: {
                text: "You fortify borders and move units into defensive positions. Time is bought, but the initiative may be lost unless you balance defense with pressure.",
                actions: this.defaultActions
            },
            rebuildForces: {
                text: "You recruit and reorganize forces. The army grows stronger, but you must still choose the right moment to act.",
                actions: this.defaultActions
            },
            secureBorders: {
                text: "You position troops along the most vulnerable fronts. This gives you flexibility and slows enemy advances.",
                actions: this.defaultActions
            },
            diplomacy: {
                text: "You open diplomatic channels. Egypt and its allies are wary. This path is less violent, but it requires skill and patience.",
                actions: this.defaultActions
            },
            seekAllies: {
                text: "You work to build alliances and secure international support. This can strengthen your hand for peace or war.",
                actions: this.defaultActions
            },
            diplomacyMeeting: {
                text: "You hold high-level diplomacy meetings, seeking agreement on a ceasefire or crisis resolution.",
                actions: this.defaultActions
            },
            researchProgress: {
                text: "Research is underway. These studies will support future operations and may unlock advantages later in the scenario.",
                actions: this.defaultActions
            },
            defendJerusalem: {
                text: "The battle for Jerusalem intensifies. Defensive discipline and bold action will determine whether the city holds.",
                actions: this.defaultActions
            },
            captureSinai: {
                text: "Egypt's Sinai forces are routed. Israel can now choose whether to press into Syria or secure the territory and seek a broader settlement.",
                actions: this.defaultActions
            },
            captureGolan: {
                text: "The Golan Heights have fallen. Your next move will decide whether the war ends historically or pushes into a full regional victory.",
                actions: this.defaultActions
            },
            historicalVictory: {
                text: "Historical Ending: Israel secures Sinai and the Golan with skillful planning and accepts a negotiated end to the war. This outcome is hard but preserves a strong post-war security position.",
                end: true
            },
            diplomaticPeace: {
                text: "Diplomatic Ending: You achieve a negotiated peace agreement without a wider territorial sweep. This medium-difficulty path preserves stability and avoids total war.",
                end: true
            },
            warVictory: {
                text: "War Ending: You push through all fronts and claim the contested territory. This medium-difficulty result is a powerful alternate-history victory.",
                end: true
            },
            defeat: {
                text: "Defeat: The conflict goes badly, and Israel is forced into a damaging retreat. This outcome is a warning that execution matters.",
                end: true
            }
        };

        this.transitionMap = {
            start: {
                attack: 'airStrike',
                defend: 'prepareDefense',
                recruit: 'rebuildForces',
                position: 'secureBorders',
                peace_talks: 'diplomacy',
                alliances: 'seekAllies',
                diplomacy_meetings: 'diplomacyMeeting',
                intelligence: 'researchProgress',
                logistics: 'researchProgress',
                technology: 'researchProgress'
            },
            airStrike: {
                attack: 'captureSinai',
                defend: 'defendJerusalem',
                recruit: 'rebuildForces',
                position: 'secureBorders',
                peace_talks: 'diplomacy',
                alliances: 'seekAllies',
                diplomacy_meetings: 'diplomacyMeeting',
                intelligence: 'researchProgress',
                logistics: 'researchProgress',
                technology: 'researchProgress'
            },
            prepareDefense: {
                attack: 'airStrike',
                defend: 'defendJerusalem',
                recruit: 'rebuildForces',
                position: 'secureBorders',
                peace_talks: 'diplomacy',
                alliances: 'seekAllies',
                diplomacy_meetings: 'diplomacyMeeting',
                intelligence: 'researchProgress',
                logistics: 'researchProgress',
                technology: 'researchProgress'
            },
            rebuildForces: {
                attack: 'airStrike',
                defend: 'prepareDefense',
                recruit: 'rebuildForces',
                position: 'secureBorders',
                peace_talks: 'diplomacy',
                alliances: 'seekAllies',
                diplomacy_meetings: 'diplomacyMeeting',
                intelligence: 'researchProgress',
                logistics: 'researchProgress',
                technology: 'researchProgress'
            },
            secureBorders: {
                attack: 'airStrike',
                defend: 'defendJerusalem',
                recruit: 'rebuildForces',
                position: 'secureBorders',
                peace_talks: 'diplomacy',
                alliances: 'seekAllies',
                diplomacy_meetings: 'diplomacyMeeting',
                intelligence: 'researchProgress',
                logistics: 'researchProgress',
                technology: 'researchProgress'
            },
            diplomacy: {
                attack: 'airStrike',
                defend: 'prepareDefense',
                recruit: 'rebuildForces',
                position: 'secureBorders',
                peace_talks: 'diplomaticPeace',
                alliances: 'seekAllies',
                diplomacy_meetings: 'diplomacy',
                intelligence: 'researchProgress',
                logistics: 'researchProgress',
                technology: 'researchProgress'
            },
            seekAllies: {
                attack: 'airStrike',
                defend: 'prepareDefense',
                recruit: 'rebuildForces',
                position: 'secureBorders',
                peace_talks: 'diplomacy',
                alliances: 'diplomacy',
                diplomacy_meetings: 'diplomacy',
                intelligence: 'researchProgress',
                logistics: 'researchProgress',
                technology: 'researchProgress'
            },
            diplomacyMeeting: {
                attack: 'airStrike',
                defend: 'prepareDefense',
                recruit: 'rebuildForces',
                position: 'secureBorders',
                peace_talks: 'diplomaticPeace',
                alliances: 'seekAllies',
                diplomacy_meetings: 'diplomacy',
                intelligence: 'researchProgress',
                logistics: 'researchProgress',
                technology: 'researchProgress'
            },
            researchProgress: {
                attack: 'airStrike',
                defend: 'prepareDefense',
                recruit: 'rebuildForces',
                position: 'secureBorders',
                peace_talks: 'diplomacy',
                alliances: 'seekAllies',
                diplomacy_meetings: 'diplomacy',
                intelligence: 'researchProgress',
                logistics: 'researchProgress',
                technology: 'researchProgress'
            },
            defendJerusalem: {
                attack: 'captureGolan',
                defend: 'historicalVictory',
                recruit: 'rebuildForces',
                position: 'secureBorders',
                peace_talks: 'diplomacy',
                alliances: 'seekAllies',
                diplomacy_meetings: 'diplomacy',
                intelligence: 'researchProgress',
                logistics: 'researchProgress',
                technology: 'researchProgress'
            },
            captureSinai: {
                attack: 'captureGolan',
                defend: 'historicalVictory',
                recruit: 'rebuildForces',
                position: 'secureBorders',
                peace_talks: 'diplomacy',
                alliances: 'seekAllies',
                diplomacy_meetings: 'diplomacy',
                intelligence: 'researchProgress',
                logistics: 'researchProgress',
                technology: 'researchProgress'
            },
            captureGolan: {
                attack: 'warVictory',
                defend: 'historicalVictory',
                recruit: 'rebuildForces',
                position: 'secureBorders',
                peace_talks: 'diplomacy',
                alliances: 'seekAllies',
                diplomacy_meetings: 'diplomacy',
                intelligence: 'researchProgress',
                logistics: 'researchProgress',
                technology: 'researchProgress'
            }
        };
    }

    start() {
        this.state = 'start';
        this.turn = 1;
        this.actionsTaken = 0;
        this.researchProgress = {
            intelligence: 0,
            logistics: 0,
            technology: 0
        };
    }

    getInitialText() {
        return this.states[this.state].text;
    }

    getStatusText() {
        const currentState = this.states[this.state];
        if (currentState.end) return 'Scenario complete. Choose restart or return to menu.';
        return `Turn ${this.turn} — ${2 - this.actionsTaken} action${this.actionsTaken === 1 ? '' : 's'} remaining`;
    }

    processCommand(command) {
        const cmd = command.toLowerCase().trim();

        if (cmd === 'restart') {
            this.start();
            return this.getInitialText();
        }

        const currentState = this.states[this.state];
        if (currentState.end) {
            return 'Scenario ended. Restart to play again.';
        }

        const nextStateKey = this.transitionMap[this.state] && this.transitionMap[this.state][cmd];
        if (!nextStateKey) {
            return 'Invalid action; choose one of the available buttons.';
        }

        if (['intelligence', 'logistics', 'technology'].includes(cmd)) {
            this.researchProgress[cmd] += 1;
            const progress = this.researchProgress[cmd];
            this.actionsTaken += 1;
            const statusText = this._advanceTurnIfNeeded();
            return `Researching ${cmd.replace(/_/g, ' ')}. Progress level ${progress}.\n\n${statusText}`;
        }

        this.state = nextStateKey;
        this.actionsTaken += 1;
        let resultText = this.states[this.state].text;

        if (!this.states[this.state].end) {
            resultText += '\n\n' + this._advanceTurnIfNeeded();
        }

        return resultText;
    }

    _advanceTurnIfNeeded() {
        if (this.actionsTaken >= 2) {
            this.turn += 1;
            this.actionsTaken = 0;
            return `Turn ${this.turn} begins.`;
        }
        return `${2 - this.actionsTaken} action${this.actionsTaken === 1 ? '' : 's'} remaining.`;
    }
}
