import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, dealDamage, enemyCreatures, modifyAmber } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: (state: GameState) => enemyCreatures(state).filter(creature => ((creature as Creature).tokens.amber > 1)),
        perform: (state: GameState, config: CardActionConfig) => {
            config.targets.forEach(creature => {
                const targetCreature = creature as Creature
                modifyAmber(activePlayerState(state), targetCreature.tokens.amber)
                targetCreature.tokens.amber = 0
                dealDamage([targetCreature] as Creature[], 1)
            })
        }
    }
}

cardScripts.scripts.set("word-of-returning", cardScript)