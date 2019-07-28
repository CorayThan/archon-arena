import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { inactivePlayerState } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.)
    // Reap: Choose a house. Your opponent cannot choose that house as their active house on their next turn.
    power: () => 2,
    elusive: () => true,
    reap: {
        selectFromChoices: (state: GameState) => inactivePlayerState(state).deckHouses,
        perform: () => {
            //TODO setEnemyPlayersHouse(config.selection)
        }
    }
}
cardScripts.scripts.set("tezmal", cardScript)