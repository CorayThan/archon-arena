import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, allCreatures, dealDamage, purgeCards } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Deal 2D to a creature.
    // You may purge any number of cards from your archives to deal an additional 2D to the same creature for each card purged this way.
    amber: () => 1,
    onPlay: {
        validTargets: (state) => activePlayerState(state).archives,
        upToTargets: () => true,
        numberOfTargets: (state) => activePlayerState(state).archives.length,
        validSecondaryTargets: allCreatures,
        numberOfSecondaryTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            purgeCards(state, config.targets)
            dealDamage(config.secondaryTargets as Creature[], 2 + 2 * config.targets.length)
        }
    }
}

cardScripts.scripts.set("destructive-analysis", cardScript)