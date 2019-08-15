import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { dealDamage } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // After this creature is used, deal 2D to it.
    //TODO afteAction
    amber: () => 1,
    action: {
        perform: (state: GameState, config: CardActionConfig) => {
            dealDamage([config.thisCard] as Creature[], 2)
        }
    }
}
cardScripts.scripts.set("bonerot-venom", cardScript)