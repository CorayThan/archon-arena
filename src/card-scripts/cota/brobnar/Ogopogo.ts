import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { Creature } from "../../../shared/gamestate/Creature"
import { allCreatures, dealDamage } from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 6,
    fight: {
        //TODO if destroyed the creature it fought... choose a target
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            dealDamage(config.targets! as Creature[], 2)
        }
    }
}

cardScripts.scripts.set("ogopogo", cardScript)
