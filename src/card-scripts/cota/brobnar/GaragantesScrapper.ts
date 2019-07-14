import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { activePlayerState, enemyCreatures, checkIfHasOneTarget, dealDamage } from "../../types/ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    alpha: () => true,
    power: () => 3,
    onPlay: {
        validTargets: (state) => {
            return activePlayerState(state).amber < 3 ? [] : enemyCreatures(state)
        },
        choosenTargetsAreValid: checkIfHasOneTarget,
        perform: (state) => {
            dealDamage(config.targets[0] as Creature, 3)
        }
    }
}

cardScripts.scripts.set("garagantes-scrapper", cardScript)