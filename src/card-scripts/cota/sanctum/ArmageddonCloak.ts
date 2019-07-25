import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // This creature gains hazardous 2 and, “Destroyed: Fully heal this creature and destroy Armageddon Cloak instead.”
    amber: () => 1,
    destroyed: {
        perform: (state: GameState, config: CardActionConfig) => {
            (config.targets[0] as Creature).tokens.damage = 0
            //TODO
            //(config.targets[0] as Creature).destroyed = false
        }
    }
}

cardScripts.scripts.set("armageddon-cloak", cardScript)