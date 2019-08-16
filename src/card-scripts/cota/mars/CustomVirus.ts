import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, allCreatures, destroyCards, purgeCards } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Omni: Sacrifice Custom Virus. Purge a creature from your hand. Destroy each creature that shares a trait with the purged creature.
    amber: () => 1,
    omni: {
        validTargets: (state: GameState) => activePlayerState(state).hand,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            const traits = config.targets[0].backingCard.traits
            const targets = allCreatures(state)
                .filter(x => (x as Creature).backingCard.traits.some(trait => traits.includes(trait)))
            purgeCards(state, config.targets)
            destroyCards(state, targets)
            destroyCards(state, [config.thisCard])
        }
    }
}

cardScripts.scripts.set("custom-virus", cardScript)