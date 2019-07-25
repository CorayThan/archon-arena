import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, friendlyCreatures, modifyAmber } from "../../ScriptUtils"
import { uniq } from "lodash"

const cardScript: CardScript = {
    // Play: Gain 3A if you control creatures from 3 different houses.
    power: () => 4,
    armor: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            const number = uniq(friendlyCreatures(state)
                .map(x => x.house)).length
            if (number >= 3) modifyAmber(activePlayerState(state), 3)
        }
    }
}

cardScripts.scripts.set("prince-derric-unifier", cardScript)