import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, allCreatures, gainChains, stunCreatures } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Play: Stun each non-Mars creature. Gain 2 chains.
    onPlay: {
        perform: (state: GameState) => {
            const targets = allCreatures(state).filter(x => x.backingCard.house !== House.Mars)
            stunCreatures(targets)
            gainChains(activePlayerState(state), 2)
        }
    }
}

cardScripts.scripts.set("phosphorus-stars", cardScript)