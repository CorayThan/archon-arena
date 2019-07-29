import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, friendlyArtifacts, getCardsWithTrait, putOnTopOfDeck } from "../../ScriptUtils"
import { shuffle } from "lodash"

const cardScript: CardScript = {
    // Action: Shuffle a card from your discard pile into your deck for each friendly Shard.
    //
    action: {
        validTargets: (state: GameState) => activePlayerState(state).discard,
        numberOfTargets: (state: GameState) => getCardsWithTrait(friendlyArtifacts(state), 'Shard').length,
        perform: (state: GameState, config: CardActionConfig) => {
            putOnTopOfDeck(state, config.targets)
            shuffle(activePlayerState(state).library)
        }
    }
}

cardScripts.scripts.set("shard-of-life", cardScript)