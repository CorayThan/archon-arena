import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {allCreatures, destroyCard} from "../../ScriptUtils"


const cardScript: CardScript = {
    power: () => 7,
    onPlay: {
        perform: (state) => {
            allCreatures(state)
                .filter(creature => creature.power <= 3)
                .forEach(creature => destroyCard(creature))
        }
    }
}

cardScripts.scripts.set("earthshaker", cardScript)