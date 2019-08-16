import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, destroyCards, friendlyArtifacts, modifyAmber } from "../../ScriptUtils"
import { CardInGame } from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
    // Play: Destroy each of your artifacts. Gain 2<A> for each artifact destroyed this way.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            modifyAmber(activePlayerState(state), friendlyArtifacts(state).length * 2)
            destroyCards(state, friendlyArtifacts(state) as CardInGame[])
        }
    }
}

cardScripts.scripts.set("oath-of-poverty", cardScript)