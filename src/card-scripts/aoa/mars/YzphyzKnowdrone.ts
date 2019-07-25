import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, purgeCards, putInArchives } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Archive a card. You may purge an archived card to stun a creature.
    power: () => 3,
    armor: () => 1,
    onPlay: {
        validTargets: (state) => activePlayerState(state).archives,
        numberOfTargets: () => 1,
        validSecondaryTargets: (state) => activePlayerState(state).hand,
        upToTargets: () => true,
        numberOfSecondaryTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            putInArchives(state, config.secondaryTargets, true)
            if (config.targets.length > 0) {
                purgeCards(state, config.targets)
                //TODO Select and stun a creature
            }
        }
    }
}

cardScripts.scripts.set("yzphyz-knowdrone", cardScript)