import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Play: Discard the top card of your opponent’s deck and reveal their hand. You gain 1<A> for each card of the discarded card’s house revealed this way. Your opponent repeats the preceding effect on you.
    onPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add onPlay code here
        }
    },
}
cardScripts.scripts.set("a-fair-game", cardScript)