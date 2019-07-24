import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { activePlayerState, friendlyCreatures, getNeighbors, modifyAmber } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Xanthyx Harvester cannot be used while it has a non-Mars neighbor. Reap: Gain 1A.
    power: () => 3,
    canBeUsed: (state, config) => {
        const neighbors = getNeighbors(friendlyCreatures(state), config.thisCard as Creature)
        return neighbors.some(x => x.backingCard.house !== House.Mars)
    },
    reap: {
        perform: (state) => {
            modifyAmber(activePlayerState(state), 1)
        }
    }
}

cardScripts.scripts.set("xanthyx-harvester", cardScript)