import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {allCreatures, stunCreature, exhaustCard, enemyCreatures} from "../../types/ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    power: () => 7,
    reap: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            stunCreature(config.targets[0] as Creature)
            exhaustCard(config.targets[0] as Creature)
        },
    },
    fight: {
        validTargets: (state) => enemyCreatures(state).filter(creature => creature.tokens.stun >0),
        perform: () => {}
    }
}

cardScripts.scripts.set("bigtwig", cardScript)