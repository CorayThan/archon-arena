import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { destroyCards, getNeighbors, inactivePlayerState, moveCreature } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Skirmish. Scowly Caper enters play under your opponent’s control and can be used as if it belonged to any house.
    // At the end of your turn, destroy one of Scowly Caper’s neighbors.
    power: () => 2,
    skirmish: () => true,
    onPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            moveCreature(state, inactivePlayerState(state), config.thisCard as Creature)
        }
    },
    atEndOfYourTurn: {
        validTargets: (state: GameState, config: CardActionConfig) => getNeighbors(state, config.thisCard as Creature),
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            destroyCards(state, config.targets)
        }
    }
}
cardScripts.scripts.set("scowly-caper", cardScript)