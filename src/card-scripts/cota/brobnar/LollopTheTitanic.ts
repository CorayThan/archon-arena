import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { activePlayerState, cardController } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    power: () => 11,
    fightingDamageDealt: (state, config) => {
        if (activePlayerState(state) !== cardController(state, config.thisCard))
            return 0
        else
            return (config!.thisCard as Creature).power
    }
}

cardScripts.scripts.set("lollop-the-titanic", cardScript)