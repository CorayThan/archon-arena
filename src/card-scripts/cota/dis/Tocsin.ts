import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { discardCards, inactivePlayerState } from "../../ScriptUtils"
import { shuffle } from "lodash"

const cardScript: CardScript = {
    // Reap: Your opponent discards a random card from their hand.
    power: () => 3,
    reap: {
        perform: (state: GameState) => {
            discardCards(state, [shuffle(inactivePlayerState(state).hand)[0]])
        }
    }
}
cardScripts.scripts.set("tocsin", cardScript)