import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, dealDamage } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // This creature gains, “Reap: Choose a creature. Deal 1<D> to that creature for each Mars creature in play.”
    // TODO add script to card scripts
    amber: () => 1,
    staticEffect: () => {
        //add reap to config.targets[0]
    },
    reap: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            const damage = allCreatures(state).filter(x => x.backingCard.house === House.Mars).length
            dealDamage(config.targets as Creature[], damage)
        }
    }
}

cardScripts.scripts.set("red-planet-ray-gun", cardScript)