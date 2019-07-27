import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { Creature } from "../../../shared/gamestate/Creature"
import { alterArmor } from "../../ScriptUtils"

const cardScript: CardScript = {
    // This creature gets +1 armor. Play: Fully heal this creature.
    amber: () => 1,
    staticEffect: (state: GameState, config: CardActionConfig) => {
        alterArmor(config.targets as Creature[], 1)
    },
    onPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            (config.targets[0] as Creature).tokens.damage = 0
        }
    }
}

cardScripts.scripts.set("seraphic-armor", cardScript)