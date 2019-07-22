import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
// import {activePlayerState, friendlyCreatures, putOnTopOfDeck} from "../../ScriptUtils"
// import {CardInGame} from "../../../shared/gamestate/CardInGame"
// import {shuffle} from "lodash"

const cardScript: CardScript = {
    // Play: Shuffle any number of friendly Untamed creatures from your hand, discard pile, or battleline back into your deck.
    amber: () => 1,
    //     //TODO Text Selction

    // onPlay: {
    //     validTargets: ['hand', 'discard', 'battleline'],
    //     numberOfTargets: () => 1,
    //     perform: (state, config) => {
    //         const cards = config.targets[0] === 'battleline' ? friendlyCreatures(state) : activePlayerState(state)[config.targets[0]]
    //         putOnTopOfDeck(state, cards as CardInGame[])
    //         shuffle(activePlayerState(state).library)
    //     }
    // },

}

cardScripts.scripts.set("song-of-spring", cardScript)