import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, friendlyCreatures, putInDeck } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Shuffle any number of friendly Untamed creatures from your hand, discard pile, or battleline back into your deck.
    amber: () => 1,
    onPlay: {
        selectFromChoices: () => ['Hand', 'Discard', 'Battleline'],
        perform: (state: GameState, config0: CardActionConfig) => {
            const cards = config0.selection === 'Battleline' ? friendlyCreatures(state) :
                (config0.selection === 'Hand' ?
                    activePlayerState(state).hand.filter(x => x.backingCard.cardType === "Creature")
                    : activePlayerState(state).discard.filter(x => x.backingCard.cardType === "Creature"))
            return {
                validTargets: () => cards,
                numberOfTargets: () => cards.length,
                upToTargets: () => true,
                perform: (state: GameState, config1: CardActionConfig) => {
                    putInDeck(state, config1.targets)
                }
            }

        }
    }
}

cardScripts.scripts.set("song-of-spring", cardScript)