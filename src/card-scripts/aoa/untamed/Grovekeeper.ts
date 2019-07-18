import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {friendlyCreatures, getNeighbors} from "../../ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // At the end of your turn, give each neighboring creature a +1 power counter.
    power: () => 3,
    atEndOfYourTurn: {
        perform: (state, config) => {
            getNeighbors(friendlyCreatures(state), config.thisCard as Creature)
                .forEach(creature => (creature as Creature).tokens.poker += 1)
        }
    }
}

cardScripts.scripts.set("grovekeeper", cardScript)