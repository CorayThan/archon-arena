import {CardScript} from "../../types/CardScript"
import {House} from "../../../shared/keyforge/house/House"
import {enemyPlayer, friendlyCreatures} from "../../ScriptUtils"


const cardScript: CardScript = {
    staticEffect: (state, config) => {
        if (config!.thisCard) {
            enemyPlayer(state, config!.thisCard).keyCost += friendlyCreatures(state)
                .filter(creature => creature.backingCard.house = House.Brobnar)
                .filter(creature => creature.tokens.damage > 0).length
        }
    }
}

//cardScripts.scripts.set("iron-obelisk", cardScript)