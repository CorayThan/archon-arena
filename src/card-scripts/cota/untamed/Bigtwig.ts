import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {allCreatures, enemyCreatures, exhaustCard, stunCreature} from "../../types/ScriptUtils"
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
<<<<<<< HEAD
        validTargets: (state) => enemyCreatures(state).filter(creature => creature.tokens.stun >0),
        perform: () => {}
=======
        //TODO can only fight stunned
        validTargets: (state) => enemyCreatures(state).filter(creature => creature.tokens.stun > 0),
        perform: () => {
        }
>>>>>>> 4cbad0f... untamed Stuff
    }
}

cardScripts.scripts.set("bigtwig", cardScript)