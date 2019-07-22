import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {
    activePlayerState,
    friendlyArtifacts,
    getCardsWithTrait,
    putOnTopOfDeck
} from "../../ScriptUtils"
import {shuffle} from "lodash"

const cardScript: CardScript = {
    // Action: Shuffle a card from your discard pile into your deck for each friendly Shard.
    //
    action: {
        validTargets: (state) => activePlayerState(state).discard,
        numberOfTargets: (state) => getCardsWithTrait(friendlyArtifacts(state), 'Shard').length,
        perform: (state, config) => {
            putOnTopOfDeck(state, config.targets)
            shuffle(activePlayerState(state).library)
        }
    }
}

cardScripts.scripts.set("shard-of-life", cardScript)