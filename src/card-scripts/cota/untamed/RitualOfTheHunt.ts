import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {destroyCard, enableUse, friendlyCreatures} from "../../ScriptUtils"

import {Creature} from "../../../shared/gamestate/Creature"
import {House} from "../../../shared/keyforge/house/House"
//TODO add enableUse to Utils
const cardScript: CardScript = {
    amber: () => 1,
    omni: {
        perform: (state, config) => {
            destroyCard(config.thisCard)
            friendlyCreatures(state)
                .filter(card => card.backingCard.house === House.Untamed)
                .forEach(target => enableUse(target as Creature))
        }
    }
}

cardScripts.scripts.set("ritual-of-the-hunt", cardScript)