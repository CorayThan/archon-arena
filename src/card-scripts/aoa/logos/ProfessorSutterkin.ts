import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, checkHouse, drawCards, friendlyCreatures } from "../../ScriptUtils"
import { CardInGame } from "../../../shared/gamestate/CardInGame"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Reap: Draw a card for each friendly Logos creature.
    power: () => 2,
    reap: {
        perform: (state: GameState) => {
            const targets = friendlyCreatures(state).filter(x => checkHouse(x as CardInGame, House.Logos))
            drawCards(activePlayerState(state), targets.length)
        }
    }
}
cardScripts.scripts.set("professor-sutterkin", cardScript)