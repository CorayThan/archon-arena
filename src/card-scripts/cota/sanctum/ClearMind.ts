import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { friendlyCreatures, unStunCreatures } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Unstun each friendly creature.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            unStunCreatures(friendlyCreatures(state))
        }
    }
}

cardScripts.scripts.set("clear-mind", cardScript)