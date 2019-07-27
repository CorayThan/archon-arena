import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, friendlyCreatures, modifyAmber } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.)
    // Reap: Move 1A from a friendly creature to your pool.
    power: () => 2,
    elusive: () => true,
    reap: {
        validTargets: (state: GameState) => friendlyCreatures(state)
            .filter(x => (x as Creature).tokens.amber > 0),
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            (config.targets[0] as Creature).tokens.amber--
            modifyAmber(activePlayerState(state), 1)
        }
    }
}

cardScripts.scripts.set("mother-northelle", cardScript)