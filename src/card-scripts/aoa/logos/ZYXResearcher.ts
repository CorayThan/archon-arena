import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, putInArchives } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Archive the top card of your deck or the top card of your discard pile.
    power: () => 2,
    onPlay: {
        selectFromChoices: () => ["Archive top card of your deck", "Archive top card of your discard"],
        perform: (state: GameState, config: CardActionConfig) => {
            const target = config.selection === "Archive top card of your deck" ? activePlayerState(state).library : activePlayerState(state).discard
            putInArchives(state, [target[0]], true)
        }
    }
}
cardScripts.scripts.set("z-y-x-researcher", cardScript)