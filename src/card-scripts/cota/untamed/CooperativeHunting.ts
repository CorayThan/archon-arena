import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {Creature} from "../../../shared/gamestate/Creature"
import {allCreatures, dealDamage, friendlyCreatures} from "../../types/ScriptUtils"


const cardScript: CardScript = {
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => friendlyCreatures.length,
        perform: (state, config) => {
            dealDamage(config.targets[0] as Creature, 1)
        }
    }
}

cardScripts.scripts.set("cooperative-hunting", cardScript)