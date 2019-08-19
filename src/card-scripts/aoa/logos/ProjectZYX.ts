import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, playCards } from "../../ScriptUtils"

const effect = {
    validTargets: (state: GameState) => activePlayerState(state).archives,
    numberOfTargets: () => 1,
    perform: (state: GameState, config: CardActionConfig) => {
        playCards(state, config.targets)
    }
}
const cardScript: CardScript = {
    // Fight/Reap: You may play one of your archived cards as if it were in your hand and in the active house.
    power: () => 5,
    armor: () => 1,
    reap: effect,
    fight: effect
}
cardScripts.scripts.set("project-z-y-x", cardScript)