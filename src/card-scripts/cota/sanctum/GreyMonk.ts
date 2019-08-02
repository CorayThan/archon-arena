import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, alterArmor, friendlyCreatures, healCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Each friendly creature gets +1 armor.  Reap: Heal 2 damage from a creature.
    power: () => 3,
    staticEffect: (state: GameState) => {
        alterArmor(friendlyCreatures(state), 1)
    },
    reap: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            healCreatures(config.targets as Creature[], 2)
        }
    }
}

cardScripts.scripts.set("grey-monk", cardScript)