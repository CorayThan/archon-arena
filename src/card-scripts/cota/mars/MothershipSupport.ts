import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, dealDamage, friendlyCreatures } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: For each friendly ready Mars creature, deal 2<D> to a creature. (You may choose a different creature each time.)
    amber: () => 1,
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: (state: GameState) => friendlyCreatures(state).filter(x => {
            x.backingCard.house === House.Mars && (x as Creature).ready
        }).length,
        uniqueTargets: () => false,
        perform: (state: GameState, config: CardActionConfig) => {
            dealDamage(config.targets as Creature[], 2)
        }
    }
}

cardScripts.scripts.set("mothership-support", cardScript)