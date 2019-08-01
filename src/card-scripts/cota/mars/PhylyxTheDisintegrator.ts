import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { friendlyCreatures, inactivePlayerState, modifyAmber } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.) 
    // Action: Your opponent loses 1<A> for each other friendly Mars creature.
    power: () => 1,
    elusive: () => true,
    action: {
        perform: (state: GameState) => {
            const friendlyMars = friendlyCreatures(state).filter(x => x.backingCard.house === House.Mars)
            modifyAmber(inactivePlayerState(state), -(friendlyMars.length - 1))
        }
    }
}

cardScripts.scripts.set("phylyx-the-disintegrator", cardScript)