import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import {activePlayerState, modifyAmber} from "../../types/ScriptUtils"

const cardScript: CardScript = {
    power: () => 5,
    fight: {
        perform: (state) => {
            modifyAmber(activePlayerState(state), 1)
        }
    }
}

cardScripts.scripts.set("headhunter", cardScript)