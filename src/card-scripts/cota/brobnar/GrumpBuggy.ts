import { CardScript, TargetArea, TargetType } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { friendlyCreatures, cardEnemy, enemyCreatures, cardController } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    staticEffect: (state, config) => {
        //TODO
        if (config.thisCardId) {
            const friendly5power = friendlyCreatures(state)
            .filter(creature => creature.power >= 5).length
            cardEnemy(state, config.thisCardId).keyCost += friendly5power
            const enemy5power = friendlyCreatures(state)
            .filter(creature => creature.power >= 5).length
            cardController(state, config.thisCardId).keyCost += enemy5power
        }
    }
}

cardScripts.scripts.set("grump-buggy", cardScript)