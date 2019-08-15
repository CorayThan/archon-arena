import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { inactivePlayerState, playCards } from "../../ScriptUtils"
import { shuffle } from "lodash"

const cardScript: CardScript = {
    // Play: Choose a random card in your opponent’s archives or the top card of your opponent’s deck. Play that card as if it were yours.
    power: () => 2,
    onPlay: {
        selectFromChoices: () => ["Enemy Archives", "Enemy Deck"],
        perform: (state: GameState, config: CardActionConfig) => {
            const target = config.selection === "Enemy Archive" ? shuffle(inactivePlayerState(state).archives) : inactivePlayerState(state).library
            if (target.length > 0) {
                playCards(state, [target[0]])
            }
        }
    }
}
cardScripts.scripts.set("murkens", cardScript)