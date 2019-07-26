import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, purgeCards } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Purge a creature with power 5 or higher.
    onPlay: {
        validTargets: (state: GameState) => allCreatures(state).filter(x => ((x as Creature).power + (x as Creature).tokens.power) >= 5),
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            purgeCards(state, config.targets)
        }
    }
}

cardScripts.scripts.set("the-harder-they-come", cardScript)