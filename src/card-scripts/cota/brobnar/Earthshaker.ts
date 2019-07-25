import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, destroyCards } from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 7,
    onPlay: {
        perform: (state: GameState) => {
            const targets = allCreatures(state)
                .filter(creature => creature.power <= 3)
            destroyCards(state, targets)
        }
    }
}

cardScripts.scripts.set("earthshaker", cardScript)
