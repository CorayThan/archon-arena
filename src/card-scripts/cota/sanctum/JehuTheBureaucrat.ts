import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { activePlayerState, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    // After you choose Sanctum as your active house, gain 2<A>.
    power: () => 3,
    //TODO Active house trigger
    staticEffect: (state) => {
        // if(activehouse = Santum) modifyAmber(activePlayerState(state), 2)
    }
}

cardScripts.scripts.set("jehu-the-bureaucrat", cardScript)