import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, allCreatures, healCreatures, modifyAmber } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            if ((config.targets[0] as Creature).tokens.damage >= 3) modifyAmber(activePlayerState(state), 1)
            healCreatures(config.targets as Creature[], 3)
        }
    }
}

cardScripts.scripts.set("vigor", cardScript)