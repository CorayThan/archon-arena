import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { friendlyCreatures, readyCreature, checkIfHasTargets, fightUsingCreature } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    onPlay: {
        validTargets: friendlyCreatures,
        choosenTargetsAreValid: (targets) => {
            if (targets.length > 0 && targets.length < 4) {
                return new Set(targets).size !== targets.length
            } else { 
                return false
            }
        },
        perform: (state, config) => {
            if (checkIfHasTargets(config!.targets, 1)) {
                readyCreature(config.targets[0] as Creature)
                fightUsingCreature(config.targets[0] as Creature)
            }
            if (checkIfHasTargets(config!.targets, 2)) {
                readyCreature(config!.targets[1] as Creature)
                fightUsingCreature(config!.targets[1] as Creature)
            }
            if (checkIfHasTargets(config!.targets, 3)) {
                readyCreature(config!.targets[2] as Creature)
                fightUsingCreature(config!.targets[2] as Creature)
            }
        }
    }
}

cardScripts.scripts.set("relentless-assault", cardScript)