import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import {dealDamage} from "../../ScriptUtils";
import {Creature} from "../../../shared/gamestate/Creature";

const cardScript: CardScript = {
    onCreatureEntersPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            dealDamage(config.targets as Creature[], 1)
        }
    }
}

cardScripts.scripts.set("autocannon", cardScript)
