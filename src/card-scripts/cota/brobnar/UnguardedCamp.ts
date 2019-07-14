import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { checkIfHasTargets, captureAmber, friendlyCreatures, enemyCreatures } from "../../types/ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: (state) => {
            return friendlyCreatures(state).length > enemyCreatures(state).length ? friendlyCreatures(state) : []
        },
        choosenTargetsAreValid: (targets) => {
            //TODO another place where I need state for validation...
            return friendlyCreatures(state).length - enemyCreatures(state).length === targets.length
            && new Set(targets).size === targets.length
        },
        perform: (state, config) => {
            config!.targets.forEach(creature => captureAmber(state, creature as Creature, 1))
        }
    }
}

cardScripts.scripts.set("unguarded-camp", cardScript)