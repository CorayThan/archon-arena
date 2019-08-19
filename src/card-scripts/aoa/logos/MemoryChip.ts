import { CardActionConfig, CardScript } from "../../types/CardScript"
import { GameState } from "../../../shared/gamestate/GameState"
import { House } from "../../../shared/keyforge/house/House"
import { cardScripts } from "../../CardScripts"
import { activePlayerState, putInArchives } from "../../ScriptUtils"

const cardScript: CardScript = {
    // After you choose Logos as your active house, archive a card.
    onHouseChoice: {
        perform: (state: GameState) => {
            if (state.activeHouse === House.Logos) {
                return {
                    validTargets: (state: GameState) => activePlayerState(state).hand,
                    numberOfTargets: () => 1,
                    perform: (state: GameState, config: CardActionConfig) => {
                        putInArchives(state, config.targets, true)
                    }
                }
            }
        }
    }
}
cardScripts.scripts.set("memory-chip", cardScript)