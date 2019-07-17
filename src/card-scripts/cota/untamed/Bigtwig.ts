import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {allCreatures, enemyCreatures, exhaustCard, stunCreature} from "../../ScriptUtils"

import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    power: () => 7,
    reap: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            config.targets.forEach(target => stunCreature(target as Creature))
            config.targets.forEach(target => exhaustCard(target as Creature))
        }
    },
    fight: {
        //TODO can only fight stunned
        validTargets: (state) => enemyCreatures(state).filter(creature => creature.tokens.stun > 0),
        perform: () => {
        }
    }
}

cardScripts.scripts.set("bigtwig", cardScript)