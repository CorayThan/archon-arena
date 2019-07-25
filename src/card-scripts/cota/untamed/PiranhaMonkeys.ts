import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, dealDamage } from "../../ScriptUtils"

import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    power: () => 2,
    onPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            const creatures = allCreatures(state).filter(card => (card as Creature).id !== config.thisCard.id)
            dealDamage(creatures, 2)
        }
    },
    reap: {
        perform: (state: GameState, config: CardActionConfig) => {
            const creatures = allCreatures(state).filter(card => (card as Creature).id !== config.thisCard.id)
            dealDamage(creatures, 2)
        }
    }
}

cardScripts.scripts.set("piranha-monkeys", cardScript)