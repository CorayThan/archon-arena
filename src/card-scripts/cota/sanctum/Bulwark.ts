import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { alterArmor, friendlyCreatures, getNeighbors } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Each of Bulwark’s neighbors gets +2 armor.
    power: () => 4,
    armor: () => 2,
    staticEffect: (state, config) => {
        const creatures = getNeighbors(friendlyCreatures(state), config.thisCard as Creature)
        alterArmor(creatures, 2)
    }
}

cardScripts.scripts.set("bulwark", cardScript)