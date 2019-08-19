import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, allCreatures, dealDamage, modifyAmber } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Choose a creature. For each trait that creature has, deal it 2D and gain 1A.
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            const traits = config.targets[0].backingCard.traits
            dealDamage(config.targets as Creature[], traits.length * 2)
            modifyAmber(activePlayerState(state), traits.length)
        }
    }
}
cardScripts.scripts.set("entropic-swirl", cardScript)