import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { dealDamage, getNeighbors } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Before Fight: Deal 3<D> to each neighbor of the creature Lord Golgotha fights.
    power: () => 5,
    armor: () => 2,
    beforeFight: {
        perform: (state: GameState, config: CardActionConfig) => {
            //TODO get targeted creature
            const targets = getNeighbors(state, config.targets[0] as Creature)
            dealDamage(targets, 3)
        }
    }
}

cardScripts.scripts.set("lord-golgotha", cardScript)