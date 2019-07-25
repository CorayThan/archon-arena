import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enemyCreatures } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    power: () => 7,
    staticEffect: (state: GameState) => {
        enemyCreatures(state)
            .filter(creature => creature.backingCard.house === House.Brobnar)
            .forEach(creature => creature.power -= 2)
    }
}

cardScripts.scripts.set("king-of-the-crag", cardScript)
