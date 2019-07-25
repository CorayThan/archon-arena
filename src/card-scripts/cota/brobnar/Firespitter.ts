import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { dealDamage, enemyCreatures } from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 5,
    armor: () => 1,
    beforeFight: {
        perform: (state: GameState) => {
            dealDamage(enemyCreatures(state), 1)
        }
    }
}

cardScripts.scripts.set("firespitter", cardScript)
