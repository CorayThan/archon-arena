import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { checkHouse, friendlyCreatures, steal } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Play: Steal 1<A> for each friendly ready Mars creature.
    onPlay: {
        perform: (state: GameState) => {
            steal(state, friendlyCreatures(state).filter(x => checkHouse(x, House.Mars) && x.ready).length)
        }
    }
}

cardScripts.scripts.set("psychic-network", cardScript)