import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enemyCreatures, friendlyCreatures, inactivePlayerState, modifyAmber } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Play: For each friendly Mars creature, choose an enemy creature to capture 1<A> from their own side.
    onPlay: {
        validTargets: enemyCreatures,
        numberOfTargets: (state: GameState) => friendlyCreatures(state)
            .filter(x => (x as Creature).backingCard.house === House.Mars).length,
        perform: (state: GameState, config: CardActionConfig) => {
            (config.targets as Creature[]).forEach(x => {
                modifyAmber(inactivePlayerState(state), -1)
                x.tokens.amber += 1
            })
        }
    }
}

cardScripts.scripts.set("hypnotic-command", cardScript)