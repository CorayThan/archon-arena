import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { friendlyCreatures, getCardsWithTrait, steal } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Alpha. (You can only play this card before doing anything else this step.) Play: Steal 1A for each friendly Thief creature.
    alpha: () => true,
    onPlay: {
        perform: (state: GameState) => {
            const targets = getCardsWithTrait(friendlyCreatures(state), "Thief")
            steal(state, targets.length)
        }
    }
}
cardScripts.scripts.set("heist-night", cardScript)