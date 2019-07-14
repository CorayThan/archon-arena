import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { House } from "../../../shared/keyforge/house/House"
import { friendlyCreatures, cardEnemy } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    staticEffect: (state, config) => {
        if (config!.thisCard) {
            cardEnemy(state, config!.thisCard).keyCost += friendlyCreatures(state)
                .filter(creature => creature.backingCard.house = House.Brobnar)
                .filter(creature => creature.tokens.damage > 0).length
        }
    }
}

cardScripts.scripts.set("iron-obelisk", cardScript)