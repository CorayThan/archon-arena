import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { friendlyCreatures, steal } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Play: Steal 1<A> for each friendly ready Mars creature.
    onPlay: {
        perform: (state: GameState) => {
            steal(state, friendlyCreatures(state).filter(x => x.backingCard.house === House.Mars).length)
        }
    }
}

cardScripts.scripts.set("psychic-network", cardScript)