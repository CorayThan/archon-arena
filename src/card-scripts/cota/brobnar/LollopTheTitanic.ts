import { CardScript, TargetArea, TargetType } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { friendlyCreatures, enemyCreatures, activePlayerState, underInactiveControl } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    power: () => 11,
    //TODO also need card ID, need to figure out whether it's under active or inactive players' control
    fightingDamageDealt: (state) => {
        if (underInactiveControl(id))
            return 0
        else
            //TODO don't know how to reference power here...
            return power
    }
}

cardScripts.scripts.set("lollop-the-titanic", cardScript)