import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { Creature } from "../../../shared/gamestate/Creature"
import { allCreatures, dealDamage, destroyCards } from "../../ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    omni: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            destroyCards(state, [config.thisCard])
            dealDamage(config.targets! as Creature[], 4)
        }
    }
}

cardScripts.scripts.set("mighty-javelin", cardScript)
