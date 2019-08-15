import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, allCreatures, dealDamage, modifyAmber } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Deal 1D to up to 3 creatures. Gain 1A for each creature destroyed this way.
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => 3,
        upToTargets: () => true,
        perform: (state: GameState, config: CardActionConfig) => {
            const destroyed = dealDamage(config.targets as Creature[], 1)
            modifyAmber(activePlayerState(state), destroyed.length)
        }
    }
}
cardScripts.scripts.set("throwing-stars", cardScript)