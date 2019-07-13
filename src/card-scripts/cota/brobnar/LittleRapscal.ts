import { CardScript, TargetArea, TargetType } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { friendlyCreatures, enemyCreatures, mustFightIfAble } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    power: () => 2,
    elusive: () => true,
    staticEffect: (state, config) => {
        friendlyCreatures(state).forEach(creature => mustFightIfAble(creature))
        enemyCreatures(state).forEach(creature => mustFightIfAble(creature))
    }
}

cardScripts.scripts.set("little-rapscal", cardScript)