import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enemyCreatures, inactivePlayerState, modifyAmber } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Each damaged enemy non-Mars creature captures 1A from their own side.
    amber: () => 1,
    onPlay: {
        validTargets: (state: GameState) => enemyCreatures(state)
            .filter(x => x.backingCard.house !== House.Mars && x.tokens.damage > 0),
        numberOfTargets: (state: GameState) => Math.min(
            enemyCreatures(state)
                .filter(x => x.backingCard.house !== House.Mars && x.tokens.damage > 0).length,
            inactivePlayerState(state).amber),
        perform: (state: GameState, config: CardActionConfig) => {
            (config.targets as Creature[]).forEach(x => x.tokens.amber++)
            modifyAmber(inactivePlayerState(state), -config.targets.length)
        }
    }
}

cardScripts.scripts.set("mars-needs-aember", cardScript)