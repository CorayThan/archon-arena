import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { enableUse, friendlyCreatures } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Fight/Reap: Use a friendly non-Mars creature.
    power: () => 3,
    reap: {
        validTargets: (state) => friendlyCreatures(state).filter(x => x.backingCard.house !== House.Mars),
        numberOfTargets: () => 1,
        perform: (state, config) => {
            enableUse(config.targets as Creature[])
        }
    },
    fight: {
        validTargets: (state) => friendlyCreatures(state).filter(x => x.backingCard.house !== House.Mars),
        numberOfTargets: () => 1,
        perform: (state, config) => {
            enableUse(config.targets as Creature[])
        }
    }
}

cardScripts.scripts.set("ulyq-megamouth", cardScript)