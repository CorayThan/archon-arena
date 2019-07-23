import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { allCreatures, healCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Reap: You may fully heal a creature. If you do, that creature cannot be dealt damage for the remainder of the turn.
    power: () => 5,
    reap: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            const damage = (config.targets[0] as Creature).tokens.damage
            if (damage > 0) {
                //TODO STATIC IMMUNITY
                healCreatures(config.targets as Creature[], damage)
            }
        }
    }
}

cardScripts.scripts.set("protectrix", cardScript)