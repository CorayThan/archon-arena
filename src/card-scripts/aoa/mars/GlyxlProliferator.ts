import { CardActionConfig, CardScript } from "../../types/CardScript"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, checkHouse, isFlank, putInArchives } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"
import { House } from "../../../shared/keyforge/house/House"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Reap: If Glyxl Proliferator is on a flank, archive a Mars card from your discard pile.
    power: () => 3,
    reap: {
        perform: (state: GameState, config0: CardActionConfig) => {
            if (isFlank(state, config0.thisCard as Creature)) {
                return {
                    validTargets: (state: GameState) => activePlayerState(state).discard
                        .filter(x => checkHouse(x, House.Mars)),
                    numberOfTargets: () => 1,
                    perform: (state: GameState, config1: CardActionConfig) => {
                        putInArchives(state, config1.targets, true)
                    }
                }
            }
        }
    }
}

cardScripts.scripts.set("glyxl-proliferator", cardScript)