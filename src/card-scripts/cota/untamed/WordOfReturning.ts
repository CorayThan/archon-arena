import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, dealDamage, enemyCreatures, modifyAmber } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Deal 1<D> to each enemy creature for each <A> on it. Return all <A> from those creatures to your pool.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            const targets = enemyCreatures(state).filter(creature => ((creature as Creature).tokens.amber > 1))
            targets.forEach(creature => {
                const amberCount = creature.tokens.amber
                dealDamage([creature], amberCount)
                modifyAmber(activePlayerState(state), amberCount)
                creature.tokens.amber = 0
            })
        }
    }
}

cardScripts.scripts.set("word-of-returning", cardScript)