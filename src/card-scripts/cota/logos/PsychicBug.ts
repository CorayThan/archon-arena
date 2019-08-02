import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { inactivePlayerState, revealCards } from "../../ScriptUtils"

const effect = {
    perform: (state: GameState) => {
        revealCards(state, inactivePlayerState(state).hand)
    }
}

const cardScript: CardScript = {
    // Play/Reap: Look at your opponent’s hand.
    amber: () => 1,
    power: () => 2,
    onPlay: effect,
    reap: effect
}
cardScripts.scripts.set("psychic-bug", cardScript)