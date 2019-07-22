import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { activePlayerState, friendlyPlayerForCard } from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 11,
    fightingDamageDealt: (state, config) => {
        if (activePlayerState(state) !== friendlyPlayerForCard(state, config.thisCard))
            return 0
        else
            return (config!.thisCard as Creature).power
    }
}

cardScripts.scripts.set("lollop-the-titanic", cardScript)
