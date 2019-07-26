import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { captureAmber, inactivePlayerState } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.)
    // Play: If your opponent has 7<A> or more, capture all of it.
    power: () => 2,
    elusive: () => true,
    onPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            const target = inactivePlayerState(state).amber
            if (target >= 7) captureAmber(state, config.thisCard as Creature, target)
        }
    }
}
cardScripts.scripts.set("drumble", cardScript)