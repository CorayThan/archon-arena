import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enemyCreatures, friendlyCreatures, mustFightWhenUsedIfAble } from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 2,
    elusive: () => true,
    staticEffect: (state: GameState) => {
        friendlyCreatures(state).forEach(creature => mustFightWhenUsedIfAble(creature))
        enemyCreatures(state).forEach(creature => mustFightWhenUsedIfAble(creature))
    }
}

cardScripts.scripts.set("little-rapscal", cardScript)
