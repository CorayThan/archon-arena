import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {inactivePlayerState} from "../../types/ScriptUtils";

const cardScript: CardScript = {
    power: () => 2,
    staticEffect: (state, config) => {
        if (config!.thisCard) {
            //TODO Probably wrong, but its the idea that counts right?
            config!.thisCard.power = config!.thisCard.power + (3 * (3 - inactivePlayerState(state).keys))
        }
    }
}

cardScripts.scripts.set("mushroom-man", cardScript)