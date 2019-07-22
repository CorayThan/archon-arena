import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {destroyCard, friendlyCreatures, useCreatures} from "../../ScriptUtils"
import {House} from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    amber: () => 1,
    omni: {
        perform: (state, config) => {
            const targets = friendlyCreatures(state)
                .filter(card => card.backingCard.house === House.Untamed)
            useCreatures(targets)
            destroyCard(config.thisCard)
        }
    }
}

cardScripts.scripts.set("ritual-of-the-hunt", cardScript)