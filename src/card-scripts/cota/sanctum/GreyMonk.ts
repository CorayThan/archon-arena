import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { allCreatures, friendlyCreatures, healCreatures, alterArmor } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Each friendly creature gets +1 armor. Reap: Heal 2 damage from a creature.
    power: () => 3,
    staticEffect: (state) => {
        alterArmor(friendlyCreatures(state), 1)
    },
    reap: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            healCreatures(config.targets as Creature[], 2)
        }
    }
}

cardScripts.scripts.set("grey-monk", cardScript)