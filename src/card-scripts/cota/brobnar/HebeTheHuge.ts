import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, dealDamage } from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 6,
    onPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            const targets = allCreatures(state)
                .filter(creature => creature.tokens.damage === 0 && creature.id !== config.thisCard.id)
            dealDamage(targets, 2)
        }
    }
}

cardScripts.scripts.set("hebe-the-huge", cardScript)
