import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {activePlayerState, friendlyCreatures, inactivePlayerState, modifyAmber} from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 3,
    staticEffect: (state, config) => {
        //TODO if action; creature entering board
        if (config.thisCard.ownerId !== activePlayerState(state).id) {
            if (friendlyCreatures.enter) {
                modifyAmber(inactivePlayerState(state), 1)
            }
        }
    }
}

cardScripts.scripts.set("teliga", cardScript)