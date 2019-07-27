import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { inactivePlayerState, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: If your opponent forged a key on their previous turn, unforge it. Your opponent gains 6<A>.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            const keyForged = true //TODO figure out this
            if (keyForged) inactivePlayerState(state).keys--
            modifyAmber(inactivePlayerState(state), 6)
        }
    }
}
cardScripts.scripts.set("key-hammer", cardScript)