import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allArtifacts, allFlankCreatures, putInHand } from "../../ScriptUtils"
import { CardInGame } from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
    // Fight/Reap: Return an artifact or flank creature to its owner’s hand.
    power: () => 4,
    reap: {
        validTargets: (state: GameState) => (allArtifacts(state) as CardInGame[]).concat(allFlankCreatures(state) as CardInGame[]),
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            putInHand(state, config.targets)
        }
    },
    fight: {
        validTargets: (state: GameState) => (allArtifacts(state) as CardInGame[]).concat(allFlankCreatures(state) as CardInGame[]),
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            putInHand(state, config.targets)
        }
    }
}
cardScripts.scripts.set("snudge", cardScript)