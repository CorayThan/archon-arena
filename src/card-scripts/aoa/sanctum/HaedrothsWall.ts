import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { alterPower, friendlyFlankCreatures } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Each friendly flank creature gets +2 power.
    staticEffect: (state) => {
        alterPower(friendlyFlankCreatures(state), 2)
    }
}

cardScripts.scripts.set("haedroths-wall", cardScript)