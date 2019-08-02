import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, inactivePlayerState, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Gain 1<A> for each forged key your opponent has.
    power: () => 4,
    onPlay: {
        perform: (state: GameState) => {
            modifyAmber(activePlayerState(state), inactivePlayerState(state).keys)
        }
    }
}
cardScripts.scripts.set("dr-escotera", cardScript)