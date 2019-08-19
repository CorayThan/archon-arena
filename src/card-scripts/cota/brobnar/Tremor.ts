import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, getNeighbors, stunCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            const targetedCreature = config.targets[0] as Creature
            const neighbors = getNeighbors(state, targetedCreature)
            stunCreatures(neighbors.concat(targetedCreature))
        }
    }
}

cardScripts.scripts.set("tremor", cardScript)
