import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // After your opponent gains A by reaping, Sir Marrows captures it.
    power: () => 4,
    armor: () => 2,
    //TODO on InactivePlayer Reap
    // onInactiveReap:
    //     (state, config) => {
    //         captureAmber(state, config.thisCard as Creature, 1)
    //     }
}

cardScripts.scripts.set("sir-marrows", cardScript)