import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, exhaustCard } from "../../ScriptUtils"

import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => 3,
        perform: (state: GameState, config: CardActionConfig) => {
            config.targets.forEach(target => exhaustCard(target as Creature))
        }
    }
}

cardScripts.scripts.set("nocturnal-maneuver", cardScript)