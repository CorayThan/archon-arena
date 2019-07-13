import { CardScript, TargetArea, TargetType } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { friendlyCreatures, cardEnemy } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    staticEffect: (state, config) => {
        //TODO
        if (config.thisCardId) {
            const damagedBrobs = friendlyCreatures(state)
            .filter(creature => creature.house = House.Brobnar)
            .filter(creature => creature.tokens.damage > 0).length
            cardEnemy(state, config.thisCardId).keyCost += damagedBrobs
        }
    }
}

cardScripts.scripts.set("iron-obelisk", cardScript)