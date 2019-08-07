import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { inactivePlayerState, putInArchives } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"
//import { putInArchives } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Fight: Archive the creature Collector Worm fights. If that creature leaves your archives, put it in its owner’s hand instead.
    power: () => 2,
    armor: () => 5,
    fight: {
        perform: (state: GameState, config: CardActionConfig) => {
            if (inactivePlayerState(state).creatures.some(x => x.id === config.targets[0].id)) {
                putInArchives(state, config.targets as Creature[], true)
            }
        }
    }
}

cardScripts.scripts.set("collector-worm", cardScript)