import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, modifyAmber, putInArchives } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Choose one: Archive a card, or, for each archived card you have, gain 1<A>.
    onPlay: {
        selectFromChoices: () => ["Archive a card", "Gain 1Æmber for each archived card"],
        perform: (state: GameState, config0: CardActionConfig) => {
            if (config0.selection === "Archive a card") {
                return {
                    validTargets: (state: GameState) => activePlayerState(state).hand,
                    numberOfTargets: () => 1,
                    perform: (state: GameState, config1: CardActionConfig) => {
                        putInArchives(state, config1.targets, true)
                    }
                }
            } else modifyAmber(activePlayerState(state), activePlayerState(state).archives.length)
        }
    }
}
cardScripts.scripts.set("knowledge-is-power", cardScript)