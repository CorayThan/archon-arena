import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Action: Choose a creature. For the remainder of the turn, that creature is considered a flank creature and gains, “Reap: Draw a card.”
    amber: () => 1,
    //TODO add turn effect
    // action: {
    //     validTargets: allCreatures,
    //     numberOfTargets: () => 1,
    //     perform: (state: GameState, config: CardActionConfig) => {
    //         const target = config.targets[0] as Creature
    //         target.flank = true
    //         target.reap: ()=> {
    //             perform: (state: GameState, config: CardActionConfig) => {
    //                 drawCards(activePlayerState(state), 1)
    //             }
    //         }
    //     }
    // }
}
cardScripts.scripts.set("spectral-tunneler", cardScript)