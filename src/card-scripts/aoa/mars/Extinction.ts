import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { allCreatures, destroyCards } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Choose a creature. Destroy that creature and each creature that shares a trait with it. Gain 1 chain.
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            const targets = allCreatures(state).filter(x => {
                return x.backingCard.traits.some(y => config.targets[0].backingCard.traits.includes(y))
            })
            destroyCards(state, targets.concat(config.targets as Creature[]))
        }
    }
}

cardScripts.scripts.set("extinction", cardScript)