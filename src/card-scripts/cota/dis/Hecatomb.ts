import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, destroyCards, inactivePlayerState, modifyAmber } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Play: Destroy each Dis creature. Each player gains 1<A> for each creature they controlled that was destroyed this way.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            [activePlayerState(state), inactivePlayerState(state)].forEach(playerState => {
                const targets = playerState.creatures
                    .filter(x => x.backingCard.house === House.Dis)
                modifyAmber(playerState, targets.length)
                destroyCards(state, targets)
            })
        }
    }
}
cardScripts.scripts.set("hecatomb", cardScript)