import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { allCreatures, destroyCards, friendlyCreatures, purgeCards } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Omni: Sacrifice Custom Virus. Purge a creature from your hand. Destroy each creature that shares a trait with the purged creature.
    amber: () => 1,
    omni: {
        validTargets: friendlyCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            const traits = config.targets[0].backingCard.traits
            const targets = allCreatures(state)
                .filter(x => (x as Creature).backingCard.traits.some(trait => traits.includes(trait)))
            purgeCards(state, config.targets)
            destroyCards(state, targets)
        }
    }
}

cardScripts.scripts.set("custom-virus", cardScript)