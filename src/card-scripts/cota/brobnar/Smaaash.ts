import {CardActionConfig, CardScript} from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { Creature } from "../../../shared/gamestate/Creature"
import {allCreatures, stunCreatures} from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 5,
    onPlay: {
        validTargets: allCreatures,
        perform: (state: GameState, config: CardActionConfig) => {
            stunCreatures(config.targets as Creature[])
        }
    }
}

cardScripts.scripts.set("smaaash", cardScript)
