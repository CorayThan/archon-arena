import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, drawCards } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Skirmish. (When you use this creature to fight, it is dealt no damage in return.) 
    // Fight: Draw a card.
    power: () => 3,
    skirmish: () => true,
    fight: {
        perform: (state: GameState) => {
            drawCards(activePlayerState(state), 1)
        }
    }
}
cardScripts.scripts.set("quixo-the-adventurer", cardScript)