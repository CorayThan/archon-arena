import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, checkHouse, readyCreatures, stunCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Play: Ready a Mars creature or stun a non-Mars creature.
    amber: () => 1,
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            if (checkHouse(config.targets[0], House.Mars)) {
                readyCreatures(config.targets as Creature[])
            } else {
                stunCreatures(config.targets as Creature[])
            }
        }
    }
}

cardScripts.scripts.set("squawker", cardScript)