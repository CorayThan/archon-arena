import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, friendlyCreatures, purgeCards } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Action: Purge a friendly Human creature from play. If you do, play a creature from your discard pile.
    amber: () => 1,
    action: {
        validTargets: (state: GameState) => friendlyCreatures(state)
            .filter(x => x.backingCard.traits.includes("Human")),
        numberOfTargets: () => 1,
        upToTargets: () => true,
        validSecondaryTargets: (state: GameState) => activePlayerState(state).discard,
        numberOfSecondaryTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            if (config.targets.length > 1) {
                purgeCards(state, config.targets)
                //TODO select which flank
                activePlayerState(state).creatures.concat(config.secondaryTargets as Creature[])
            }
        }
    }
}
cardScripts.scripts.set("sacrificial-altar", cardScript)