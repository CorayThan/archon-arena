import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, checkHouse, dealDamage } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // This creature gains, “Reap: Choose a creature. Deal 1<D> to that creature for each Mars creature in play.”
    amber: () => 1,
    reap: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            const damage = allCreatures(state).filter(x => checkHouse(x, House.Mars)).length
            dealDamage(config.targets as Creature[], damage)
        }
    }
}

cardScripts.scripts.set("red-planet-ray-gun", cardScript)