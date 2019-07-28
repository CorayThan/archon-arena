import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { gainChains, inactivePlayerState } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Your opponent gains 3 chains.
    onPlay: {
        perform: (state: GameState) => {
            gainChains(inactivePlayerState(state), 3)
        }
    }
}
cardScripts.scripts.set("binding-irons", cardScript)