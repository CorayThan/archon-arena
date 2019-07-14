import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import {friendlyCreatures, cardEnemy, cardController, enemyCreatures} from "../../types/ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    staticEffect: (state, config) => {
        if (config!.thisCard) {
            cardEnemy(state, config.thisCard).keyCost += friendlyCreatures(state)
                .filter(creature => creature.power >= 5).length
            cardController(state, config.thisCard).keyCost += enemyCreatures(state)
                .filter(creature => creature.power >= 5).length
        }
    }
}

cardScripts.scripts.set("grump-buggy", cardScript)