import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {allCreatures, destroyCard} from "../../types/ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        perform: (state) => {
            const creaturesInPlay = allCreatures(state)
            creaturesInPlay
                .filter(creature => creature.traits.includes("Scientist"))
                .forEach(creature => destroyCard(creature))
        }
    },

}

cardScripts.scripts.set("curiosity", cardScript)