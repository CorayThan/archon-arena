import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {enemyCreatures, inactivePlayerState} from "../../ScriptUtils"
import {uniq} from "lodash"

const cardScript: CardScript = {
    // While your opponent does not control creatures from 3 different houses, their keys cost +2A.
    staticEffect: (state) => {
        const number = uniq(enemyCreatures(state)
            .map(x => x.house)).length
        if (number < 3) inactivePlayerState(state).keyCost += 3
    }
}

cardScripts.scripts.set("proclamation-346-e", cardScript)