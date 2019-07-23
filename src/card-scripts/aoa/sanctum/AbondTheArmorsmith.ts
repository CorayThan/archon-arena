import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { alterArmor, friendlyCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Other friendly creatures get +1 armor.
    // Action: For the remainder of the turn, other friendly creatures get +1 armor.
    power: () => 3,
    staticEffect: (state, config) => {
        const targets = friendlyCreatures(state).filter(x => (x as Creature).id !== (config.thisCard as Creature).id)
        alterArmor(targets, 1)
    },
    action: {
        perform: (state, config) => {
            const targets = friendlyCreatures(state).filter(x => (x as Creature).id !== (config.thisCard as Creature).id)
            alterArmor(targets, 1)
        }
    }
}

cardScripts.scripts.set("abond-the-armorsmith", cardScript)