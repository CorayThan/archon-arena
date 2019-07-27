import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { dealDamage, enemyCreatures, onFlank } from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 4,
    onPlay: {
        perform: (state: GameState) => {
            const targets = enemyCreatures(state)
                .filter(creature => onFlank(enemyCreatures(state), creature))
            dealDamage(targets, 2)
        }
    }
}

cardScripts.scripts.set("brammo", cardScript)
