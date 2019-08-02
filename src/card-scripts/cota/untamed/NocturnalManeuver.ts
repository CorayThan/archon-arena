import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, exhaustCards } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => 3,
        perform: (state: GameState, config: CardActionConfig) => {
            exhaustCards(config.targets as Creature[])
        }
    }
}

cardScripts.scripts.set("nocturnal-maneuver", cardScript)