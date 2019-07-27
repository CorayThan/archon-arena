import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // After an enemy creature is destroyed fighting Francus, Francus captures 1<A>.
    power: () => 6,
    armor: () => 1,
    //TODO make onDestroyedCreatureDuringFight trigger
    // onDestroyedCreatureDuringFight: {
    //     perform: (state: GameState, config: CardActionConfig) => {
    //         captureAmber(state, config.thisCard as Creature, 1 )
    //     }
    // }
}

cardScripts.scripts.set("francus", cardScript)