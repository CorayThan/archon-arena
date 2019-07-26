import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { discardCards, inactivePlayerState } from "../../ScriptUtils"
import { shuffle } from "lodash"

const cardScript: CardScript = {
    // Play: Your opponent discards a random card from their hand.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            const targets = shuffle(inactivePlayerState(state).hand)[0]
            discardCards(state, [targets])
        }
    },
}
cardScripts.scripts.set("mind-barb", cardScript)