import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {Creature} from "../../../shared/gamestate/Creature"
import {destroyCard, enemyCreatures, stunCreature} from "../../types/ScriptUtils"

const cardScript: CardScript = {
    amber: () =>  1,
    onPlay: {
        validTargets: enemyCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            const targetedCreature = config.targets[0] as Creature
            if(targetedCreature.tokens.stun > 0)
                destroyCard(targetedCreature)
            else
                stunCreature(targetedCreature)
        }
    }
}

cardScripts.scripts.set("1-2-punch", cardScript)