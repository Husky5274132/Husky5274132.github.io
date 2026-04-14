# War Scenarios Game

A web-based alternate history game with interactive scenarios and achievements.

## How to Play

Open `index.html` in a web browser. Use the main menu to browse scenarios or view achievements. Select a scenario to start, then click action buttons to progress through the story.

## Features

- Interactive scenarios with branching paths
- Achievement system tracking accomplishments
- Searchable scenario list (expandable for more scenarios)
- Alternate history outcomes

## Actions
- Military: Attack, Defend, Recruit, Position
- Diplomacy: Peace Talks, Alliances, Diplomacy Meetings
- Research: Intelligence, Logistics, Technology (1967-specific research added for future buffs and achievements)

## Scenarios

- **Six Day War (1967)**: Play as Israel's Prime Minister. Choose 2 actions per turn from Military, Diplomacy, and Research categories. Outcomes lead to 3 main endings: Historical (hard), Diplomatic (medium), War (medium).

## Achievements

- Diplomat: Achieved peace through negotiation.
- Conqueror: Achieved full victory.
- Defender: Held the line defensively.
- Strategist: Launched a preemptive strike.
- Survivor: Ended in stalemate or partial victory.

Achievements are saved locally.

## Files

- `index.html`: Main game interface
- `game.js`: Game logic, UI management, and achievements
- `styles.css`: Styling
- `scenarios/scenarioManager.js`: Scenario management
- `scenarios/sixDayWar.js`: Six Day War scenario