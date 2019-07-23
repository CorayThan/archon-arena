import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { allCreatures, readyCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.)
    // Fight/Reap: Ready a non-Agent Mars creature.
    power: () => 2,
    elusive: () => true,
    reap: {
        validTargets: (state) => allCreatures(state)
            .filter(x => {
                return ((x as Creature).backingCard.house === House.Mars || (x as Creature).backingCard.traits.includes("Agent"))
            }),
        numberOfTargets: () => 1,
        perform: (state, config) => {
            readyCreatures(config.targets as Creature[])
        }
    },
    fight: {
        validTargets: (state) => allCreatures(state)
            .filter(x => {
                return ((x as Creature).backingCard.house === House.Mars || (x as Creature).backingCard.traits.includes("Agent"))
            }),
        numberOfTargets: () => 1,
        perform: (state, config) => {
            readyCreatures(config.targets as Creature[])
        }
    }
}

cardScripts.scripts.set("john-smyth", cardScript)