import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, forgeKey } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: If you have not forged a key this turn, you may forge a key at +4A current cost.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            //TODO add check to see if player forged this turn
            forgeKey(activePlayerState(state), 4)
        }
    }
}
cardScripts.scripts.set("nightforge", cardScript)