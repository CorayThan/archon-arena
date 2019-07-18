import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {discardCard, inactivePlayerState} from "../../ScriptUtils"
import {shuffle} from "lodash"
import {CardInGame} from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
    // Tantadlin only deals 2D when fighting.
    // Fight: Discard a random card from your opponent’s archives.
    //TODO fight only do 2D
    power: () => 9,
    fight: {
        perform: (state) => {
            discardCard(state, (shuffle(inactivePlayerState(state).archives)[0] as CardInGame), false)
        }
    }
}

cardScripts.scripts.set("tantadlin", cardScript)