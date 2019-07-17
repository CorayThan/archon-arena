import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {allCreatures, dealDamage} from "../../ScriptUtils"


const cardScript: CardScript = {
    power: () => 6,
    onPlay: {
        perform: (state, config) => {
            allCreatures(state)
                .filter(creature => creature.tokens.damage === 0 && creature.id !== config.thisCard.id)
                .forEach(creature => dealDamage(creature, 2))
        }
    }
}

cardScripts.scripts.set("hebe-the-huge", cardScript)