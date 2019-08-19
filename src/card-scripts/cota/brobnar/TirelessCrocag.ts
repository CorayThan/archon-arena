import {CardActionConfig, CardScript} from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import {destroyCard, enemyCards} from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 7,
    cannotReap: () => true,
    canAlwaysUse: () => true,
    runAfterAnyAction: {
        perform: (state: GameState, config: CardActionConfig) => {
            if (enemyCards(state).length === 0) {
                destroyCard(state, config.thisCard)
            }
        }
    }
}

cardScripts.scripts.set("tireless-crocag", cardScript)
