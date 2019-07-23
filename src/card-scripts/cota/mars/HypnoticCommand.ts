import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { enemyCreatures, friendlyCreatures, inactivePlayerState, modifyAmber } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Play: For each friendly Mars creature, choose an enemy creature to capture 1<A> from their own side.
    onPlay: {
        validTargets: enemyCreatures,
        numberOfTargets: (state) => friendlyCreatures(state)
            .filter(x => (x as Creature).backingCard.house === House.Mars).length,
        perform: (state, config) => {
            (config.targets as Creature[]).forEach(x => {
                modifyAmber(inactivePlayerState(state), -1)
                x.tokens.amber += 1
            })
        }
    }
}

cardScripts.scripts.set("hypnotic-command", cardScript)