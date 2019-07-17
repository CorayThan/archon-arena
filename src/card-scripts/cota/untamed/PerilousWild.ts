import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {allCreatures, destroyCard} from "../../types/ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        //TODO add elusive to Creature
        validTargets: (state) => allCreatures(state).filter(creature => creature.elusive),
        numberOfTargets: () => 1,
        perform: (state, config) => {
            config.targets.forEach(target => destroyCard(target as Creature))
        },
    }
}

cardScripts.scripts.set("perilous-wild", cardScript)