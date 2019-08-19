import {CardActionConfig, CardScript} from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { Creature } from "../../../shared/gamestate/Creature"
import {activePlayerState, destroyCard, forgeKey, friendlyCreatures} from "../../ScriptUtils"
import {CardInGame} from "../../../shared/gamestate/CardInGame";

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: friendlyCreatures,
        numberOfTargets: (state: GameState) => {
            return friendlyCreatures(state).length
        },
        upToTargets: () => true,
        chosenTargetsAreValid: (targets: CardInGame[]) => {
            return targets.length === 0
                || targets
                    .map(target => (target as Creature).power)
                    .reduce((a, b) => a + b)
                >= 25
        },
        perform: (state: GameState, config: CardActionConfig) => {
            let totalSacrificedPower = 0
            config.targets.forEach(target => {
                    let power = (target as Creature).power
                    if(destroyCard(state, target)) {
                        totalSacrificedPower += power
                    }
                }
            )
            if (totalSacrificedPower >= 25) {
                forgeKey(activePlayerState(state))
            }
        }
    }
}

cardScripts.scripts.set("might-makes-right", cardScript)
