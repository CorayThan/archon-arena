import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { destroyCards, friendlyCreatures, stunCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const effect = {
    validTargets: friendlyCreatures,
    numberOfTargets: () => 1,
    upToTargets: () => true,
    perform: (state: GameState, config: CardActionConfig) => {
        (config.thisCard as Creature).tokens.damage = 0
        destroyCards(state, config.targets)
    }
}

const cardScript: CardScript = {
    // Taunt. (This creature’s neighbors cannot be attacked unless they have taunt.) 
    // Chuff Ape enters play stunned. 
    // Fight/Reap: You may sacrifice another friendly creature. If you do, fully heal Chuff Ape.
    power: () => 11,
    taunt: () => true,
    onPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            stunCreatures([config.thisCard] as Creature[])
        }
    },
    reap: effect,
    fight: effect
}

cardScripts.scripts.set("chuff-ape", cardScript)