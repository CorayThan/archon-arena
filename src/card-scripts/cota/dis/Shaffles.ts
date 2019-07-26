import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { inactivePlayerState, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    // At the end of your turn, your opponent loses 1<A>.
    power: () => 2,
    atEndOfYourTurn: {
        perform: (state: GameState) => {
            modifyAmber(inactivePlayerState(state), -1)
        }
    }
}
cardScripts.scripts.set("shaffles", cardScript)