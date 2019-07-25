import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // After you discard a Sanctum card from your hand, Baron Mengevin captures 1A.
    power: () => 6,
    armor: () => 1,
    //TODO onDiscard trigget
    // onDiscard: (state, config) => {
    //     if (config.target[0].backingCard.house === House.Brobnar) capturAmber(config.thisCard as Creature, 1)
    // }
}

cardScripts.scripts.set("baron-mengevin", cardScript)