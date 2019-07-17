import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {Creature} from "../../../shared/gamestate/Creature"
import {captureAmber, enemyCreatures, friendlyCreatures} from "../../types/ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: (state) => {
            return friendlyCreatures(state).length > enemyCreatures(state).length ? friendlyCreatures(state) : []
        },
        numberOfTargets: (state) => {
            return Math.max(friendlyCreatures(state).length - enemyCreatures(state).length, 0)
        },
        chosenTargetsAreValid: (targets, state) => {
            return friendlyCreatures(state).length - enemyCreatures(state).length === targets.length
                && new Set(targets).size === targets.length
        },
        uniqueTargets: () => true,
        perform: (state, config) => {
            config.targets.forEach(creature => captureAmber(state, creature as Creature, 1))
        }
    }
}

cardScripts.scripts.set("unguarded-camp", cardScript)