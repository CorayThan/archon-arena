import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, modifyAmber, putInArchives } from "../../ScriptUtils"
import { shuffle } from "lodash"

const cardScript: CardScript = {
    // Alpha.  Play: Gain 2A. Archive 2 random cards from your hand.
    amber: () => 1,
    alpha: () => true,
    onPlay: {
        perform: (state: GameState) => {
            modifyAmber(activePlayerState(state), 2)
            const cards = shuffle(activePlayerState(state).hand).slice(0, 2)
            putInArchives(state, cards, true)
        }
    }
}
cardScripts.scripts.set("eureka", cardScript)