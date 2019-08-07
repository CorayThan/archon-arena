import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { playCards } from "../../ScriptUtils"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // After an enemy creature is destroyed fighting Overlord Greking, put that creature into play under your control.
    power: () => 7,
    onDestroyedEnemyInFight: {
        perform: (state: GameState, config: CardActionConfig) => {
            playCards(state, [config.triggerCard])
        }
    }
}
cardScripts.scripts.set("overlord-greking", cardScript)