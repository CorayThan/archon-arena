import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {destroyCards, enemyCreatures, friendlyCreatures} from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Destroy an enemy creature. Repeat this card’s effect if your opponent still controls more creatures than you.
    power: () => 3,
    onPlay: {
        validTargets: enemyCreatures,
        numberOfTargets: (state) => enemyCreatures(state).length - friendlyCreatures(state).length,
        perform: (state, config) => {
            destroyCards(state, config.targets)
        }
    }
}

cardScripts.scripts.set("numquid-the-fair", cardScript)