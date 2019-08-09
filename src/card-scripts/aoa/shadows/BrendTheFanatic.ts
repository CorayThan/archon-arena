import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { inactivePlayerState, modifyAmber, steal } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Skirmish. Play: Your opponent gains 1A. Destroyed: Steal 3A.
    power: () => 3,
    skirmish: () => true,
    onPlay: {
        perform: (state: GameState) => {
            modifyAmber(inactivePlayerState(state), 1)
        }
    },
    destroyed: {
        perform: (state: GameState) => {
            steal(state, 3)
        }
    }
}
cardScripts.scripts.set("brend-the-fanatic", cardScript)