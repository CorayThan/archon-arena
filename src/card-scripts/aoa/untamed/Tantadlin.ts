import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { discardCards, inactivePlayerState } from "../../ScriptUtils"
import { shuffle } from "lodash"

const cardScript: CardScript = {
    // Tantadlin only deals 2D when fighting.
    // Fight: Discard a random card from your opponent’s archives.
    power: () => 9,
    fightingDamageDealt: () => 2,
    fight: {
        perform: (state: GameState) => {
            discardCards(state, (shuffle(inactivePlayerState(state).archives).slice(0, 1)))
        }
    }
}

cardScripts.scripts.set("tantadlin", cardScript)