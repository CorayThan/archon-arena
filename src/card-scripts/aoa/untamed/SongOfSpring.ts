import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, friendlyCreatures, putOnTopOfDeck } from "../../ScriptUtils"
import { CardInGame } from "../../../shared/gamestate/CardInGame"
import { shuffle } from "lodash"

const cardScript: CardScript = {
    // Play: Shuffle any number of friendly Untamed creatures from your hand, discard pile, or battleline back into your deck.
    amber: () => 1,
    onPlay: {
        selectFromChoices: ['hand', 'discard', 'battleline'],
        perform: (state: GameState, config: CardActionConfig) => {
            const cards = config.selection === 'battleline' ? friendlyCreatures(state) :
                (config.selection === 'hand' ? activePlayerState(state).hand : activePlayerState(state).discard)
            putOnTopOfDeck(state, cards as CardInGame[])
            shuffle(activePlayerState(state).library)
        }
    }
}

cardScripts.scripts.set("song-of-spring", cardScript)