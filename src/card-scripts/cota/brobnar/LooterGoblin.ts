import {CardActionConfig, CardScript} from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import {GameState} from "../../../shared/gamestate/GameState";

const cardScript: CardScript = {
    power: () => 2,
    elusive: () => true,
    reap: {
        perform: (state: GameState, config: CardActionConfig) => {
            //TODO
        }
    }
}

//cardScripts.scripts.set("looter-goblin", cardScript)
