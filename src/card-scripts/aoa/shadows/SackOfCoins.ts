import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, allCreatures, dealDamage } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Deal 1D to a creature for each A in your pool.
    amber: () => 1,
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: (state: GameState) => activePlayerState(state).amber,
        perform: (state: GameState, config: CardActionConfig) => {
            dealDamage(config.targets as Creature[], 1)
        }
    }
}
cardScripts.scripts.set("sack-of-coins", cardScript)