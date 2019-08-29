import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { House } from "../../../shared/keyforge/house/House"
import { enemyPlayer, friendlyCreatures } from "../../ScriptUtils"

const cardScript: CardScript = {
    staticEffect: (state: GameState, config: CardActionConfig) => {
        if (config.thisCard) {
            enemyPlayer(state, config.thisCard).keyCost += friendlyCreatures(state)
                .filter(creature => creature.backingCard.house === House.Brobnar)
                .filter(creature => creature.tokens.damage > 0)
                .length
        }
    }
}

cardScripts.scripts.set("iron-obelisk", cardScript)
