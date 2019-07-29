import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import {dealDamage, friendlyPlayer} from "../../ScriptUtils";
import {Creature} from "../../../shared/gamestate/Creature";

const cardScript: CardScript = {
    power: () => 2,
    elusive: () => true,
    onCreatureEntersPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            if (friendlyPlayer(state, config.triggerCard) !== friendlyPlayer(state, config.thisCard)) {
                dealDamage(config.targets as Creature[], 1)
            }
        }
    }
}

cardScripts.scripts.set("pingle-who-annoys", cardScript)
