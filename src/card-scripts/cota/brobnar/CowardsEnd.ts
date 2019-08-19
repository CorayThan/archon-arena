import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, allCreatures, destroyCards, gainChains } from "../../ScriptUtils"

const cardScript: CardScript = {
    onPlay: {
        perform: (state: GameState) => {
            const targets = allCreatures(state)
                .filter(creature => creature.tokens.damage === 0)
            destroyCards(state, targets)
            gainChains(activePlayerState(state), 3)
        }
    }
}

cardScripts.scripts.set("cowards-end", cardScript)
