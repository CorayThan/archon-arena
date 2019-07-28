import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, putInDeck } from "../../ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        //TODO if will allow any four creatures not 2 from each side, which is wrong
        validTargets: allCreatures,
        numberOfTargets: () => 4,
        perform: (state: GameState, config: CardActionConfig) => {
            putInDeck(state, config.targets)
        }
    }
}

cardScripts.scripts.set("lost-in-the-woods", cardScript)