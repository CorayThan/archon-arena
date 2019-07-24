import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { House } from "../../../shared/keyforge/house/House"
import { friendlyCreatures, enemyPlayerForCard } from "../../ScriptUtils"

const cardScript: CardScript = {
    staticEffect: (state, config) => {
        if (config!.thisCard) {
            enemyPlayerForCard(state, config!.thisCard).keyCost += friendlyCreatures(state)
                .filter(creature => creature.backingCard.house = House.Brobnar)
                .filter(creature => creature.tokens.damage > 0).length
        }
    }
}

cardScripts.scripts.set("iron-obelisk", cardScript)
