import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { checkIfHasOneTarget, allCreatures, dealDamage } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    power: () => 4,
    onPlay: {
        validTargets: allCreatures,
        choosenTargetsAreValid: checkIfHasOneTarget,
        perform: (state, config) => {
            dealDamage(config.targets[0] as Creature, 2)
        }
    }
}

cardScripts.scripts.set("flamewake-shaman", cardScript)