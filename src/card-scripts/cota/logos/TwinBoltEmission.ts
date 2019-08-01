import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, dealDamage } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Deal 2<D> to a creature and deal 2<D> to a different creature.
    amber: () => 1,
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => 2,
        perform: (state: GameState, config: CardActionConfig) => {
            dealDamage(config.targets as Creature[], 2)
        }
    }
}
cardScripts.scripts.set("twin-bolt-emission", cardScript)