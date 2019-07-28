import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, friendlyCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Taunt. (This creature’s neighbors cannot be attacked unless they have taunt.)Fight/Reap: Swap Sanctum Guardian with another friendly creature in your battleline.
    power: () => 6,
    armor: () => 1,
    taunt: () => true,
    reap: {
        validTargets: friendlyCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            const creatures = friendlyCreatures(state)
            const thisCardIndex = creatures.findIndex(creat => (creat.id === (config.thisCard as Creature).id))
            const swapIndex = creatures.findIndex(creat => (creat.id === (config.targets[0] as Creature).id))
            const swap = creatures[swapIndex]
            creatures[swapIndex] = creatures[thisCardIndex]
            creatures[thisCardIndex] = swap
            activePlayerState(state).creatures = creatures
        }
    },
    fight: {
        validTargets: friendlyCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            const creatures = friendlyCreatures(state)
            const thisCardIndex = creatures.findIndex(creat => (creat.id === (config.thisCard as Creature).id))
            const swapIndex = creatures.findIndex(creat => (creat.id === (config.targets[0] as Creature).id))
            const swap = creatures[swapIndex]
            creatures[swapIndex] = creatures[thisCardIndex]
            creatures[thisCardIndex] = swap
            activePlayerState(state).creatures = creatures
        }
    }
}

cardScripts.scripts.set("sanctum-guardian", cardScript)