import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, dealDamage, discardCards, friendlyPlayer } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"
import { shuffle } from "lodash"

const cardScript: CardScript = {
    // Play: Deal 3<D> to a creature. If it is not destroyed, its owner discards a random card from their hand.
    amber: () => 1,
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {

            const destroyed = dealDamage(config.targets as Creature[], 3)
            if (destroyed.some(x => x)) {
                const target = shuffle(friendlyPlayer(state, config.targets[0]).hand)[0]
                discardCards(state, [target])
            }
        }
    }
}
cardScripts.scripts.set("gongoozle", cardScript)