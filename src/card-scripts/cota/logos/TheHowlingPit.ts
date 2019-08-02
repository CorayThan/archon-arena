import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allPlayerStates } from "../../ScriptUtils"

const cardScript: CardScript = {
    // During their “draw cards” step, each player refills their hand to 1 additional card.
    amber: () => 1,
    staticEffect: (state: GameState) => {
        allPlayerStates(state).forEach(playerState => playerState.handSize += 1)
    }
}
cardScripts.scripts.set("the-howling-pit", cardScript)