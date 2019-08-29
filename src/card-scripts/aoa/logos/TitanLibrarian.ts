import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { Creature } from "../../../shared/gamestate/Creature"
import { activePlayerState, isFlank, putInArchives } from "../../ScriptUtils"

const cardScript: CardScript = {
    // At the end of your turn, if Titan Librarian is not on a flank, archive a card.
    power: () => 4,
    atEndOfYourTurn: {
        perform: (state: GameState, config0: CardActionConfig) => {
            if (isFlank(state, config0.thisCard as Creature)) {
                return {
                    validTargets: (state: GameState) => activePlayerState(state).hand,
                    numberOfTargets: () => 1,
                    perform: (state: GameState, config1: CardActionConfig) => {
                        putInArchives(state, config1.targets, true)
                    }
                }
            }
        }
    }
}
cardScripts.scripts.set("titan-librarian", cardScript)