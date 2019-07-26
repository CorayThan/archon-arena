import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { inactivePlayerState } from "../../ScriptUtils"

// @ts-ignore
const cardScript: CardScript = {
    // Play: Choose a house on your opponent’s identity card. Your opponent must choose that house as their active house on their next turn.
    amber: () => 1,
    onPlay: {
        selectFromChoices: (state: GameState) => inactivePlayerState(state).deckHouses,
        perform: (state: GameState, config: CardActionConfig) => {
            //TODO setEnemyPlayersHouse(config.selection)
        }
    }
}
cardScripts.scripts.set("control-the-weak", cardScript)