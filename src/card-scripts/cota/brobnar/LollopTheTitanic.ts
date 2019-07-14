import { CardScript, TargetArea, TargetType } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { friendlyCreatures, enemyCreatures, activePlayerState, cardController } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    power: () => 11,
    //TODO Need config here to get reference to self
    fightingDamageDealt: (state, config) => {
        if (activePlayerState(state) !== cardController(state, config!.thisCard))
            return 0
        else
        	//TODO I feel like this would reference the original power rather than current power... don't know how to do the latter
            return (config!.thisCard as Creature).power
    }
}

cardScripts.scripts.set("lollop-the-titanic", cardScript)