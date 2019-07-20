import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {friendlyCreatures, putInHand} from "../../ScriptUtils"
import {House} from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    power: () => 3,
    onPlay: {
        perform: (state, config) => {
            const creatures = friendlyCreatures(state)
                .filter(creature => creature.backingCard.house === House.Brobnar
                    && creature.id !== config.thisCard.id)
            putInHand(state, creatures)
        }
    }
}

cardScripts.scripts.set("wardrummer", cardScript)