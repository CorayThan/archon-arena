import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { enemyCreatures, enemyPlayer } from "../../ScriptUtils"
import { uniq } from "lodash"

const cardScript: CardScript = {
    // While your opponent does not control creatures from 3 different houses, their keys cost +2A.
    staticEffect: (state, config) => {
        const number = uniq(enemyCreatures(state)
            .map(x => x.house)).length
        if (number < 3) enemyPlayer(state, config.thisCard).keyCost += 3
    }
}

cardScripts.scripts.set("proclamation-346-e", cardScript)