import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {allCreatures, dealDamage} from "../../ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"


const cardScript: CardScript = {
    power: () => 4,
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            dealDamage(config.targets as Creature[], 2)
        }
    }
}

cardScripts.scripts.set("flamewake-shaman", cardScript)