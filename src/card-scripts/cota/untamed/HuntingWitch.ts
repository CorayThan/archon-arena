import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
// import {activePlayerState, friendlyCreatures, modifyAmber} from "../../ScriptUtils"


const cardScript: CardScript = {
    power: () => 2,
//     staticEffect: (state, config) => {
//         TODO if action; creature entering board
//     }
//     }
}

cardScripts.scripts.set("hunting-witch", cardScript)