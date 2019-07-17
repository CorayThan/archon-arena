import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {destroyCard, enableUse, friendlyCreatures} from "../../types/ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"
//TODO add enableUse to Utils
const cardScript: CardScript = {
    amber: () => 1,
    omni: {
        perform: (state, config) => {
            destroyCard(config.thisCard)
            friendlyCreatures(state)
            //TODO add house to Creature
                .filter(creature => creature.house === "Untamted")
                .forEach(target => enableUse(target as Creature))
        }
    }
}

cardScripts.scripts.set("ritual-of-the-hunt", cardScript)