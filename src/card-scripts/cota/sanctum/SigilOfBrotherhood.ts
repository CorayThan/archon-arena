import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { checkHouse, destroyCards, enableUse, friendlyCreatures } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"
import { CardInGame } from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
    // Omni: Sacrifice Sigil of Brotherhood. For the remainder of the turn, you may use friendly Sanctum creatures.
    amber: () => 1,
    omni: {
        perform: (state: GameState, config: CardActionConfig) => {
            //TODO not really going to work
            enableUse(friendlyCreatures(state).filter(x => checkHouse(x, House.Sanctum)))
            destroyCards(state, [config.thisCard] as CardInGame[])
        }
    }
}

cardScripts.scripts.set("sigil-of-brotherhood", cardScript)