import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, destroyCards, totalPower } from "../../ScriptUtils"
import { reverse, sortedUniq } from "lodash"

const cardScript: CardScript = {
    // Play: Destroy the 3 most powerful creatures.
    amber: () => 1,
    onPlay: {
        validTargets: (state: GameState) => {
            let top3Powers = allCreatures(state).map(x => totalPower(x))
            top3Powers = sortedUniq(top3Powers)
            top3Powers = reverse(top3Powers)
            top3Powers = top3Powers.slice(0, 3)
            return allCreatures(state)
                .filter(x => top3Powers.includes(totalPower(x)))
        },
        numberOfTargets: () => 3,
        uniqueTargets: () => true,
        upToTargets: () => false,
        perform: (state: GameState, config: CardActionConfig) => {
            destroyCards(state, config.targets)
        }
    }
}
cardScripts.scripts.set("three-fates", cardScript)