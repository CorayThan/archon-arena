import { CardScript, TargetArea, TargetType } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { checkIfHasOneTarget, friendlyCreatures, readyCreature, fightUsingCreature } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    action: {
        validTargets: friendlyCreatures,
        choosenTargetsAreValid: checkIfHasOneTarget,
    	perform: (state, config) => {
            const targetedCreature = config.targets[0] as Creature
            readyCreature(targetedCreature)
            fightUsingCreature(targetedCreature)
        }
    }
}

cardScripts.scripts.set("gauntlet-of-command", cardScript)