import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { putInArchives } from "../../ScriptUtils"

const cardScript: CardScript = {
    // This creature gains, “Destroyed: Put this creature into its owner's archives.”
    amber: () => 1,
    destroyed: {
        perform: (state: GameState, config: CardActionConfig) => {
            putInArchives(state, config.targets, true)
        }
    }
}

cardScripts.scripts.set("biomatrix-backup", cardScript)