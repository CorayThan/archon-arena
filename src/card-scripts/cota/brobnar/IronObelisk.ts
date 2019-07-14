import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { House } from "../../../shared/keyforge/house/House"
import { friendlyCreatures, cardEnemy } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    staticEffect: (state, config) => {
        if (config!.thisCard) {
            const damagedBrobs = friendlyCreatures(state)
            .filter(creature => creature.backingCard.house = House.Brobnar)
            .filter(creature => creature.tokens.damage > 0).length
            cardEnemy(state, config!.thisCard).keyCost += damagedBrobs
        }
    }
}

cardScripts.scripts.set("iron-obelisk", cardScript)