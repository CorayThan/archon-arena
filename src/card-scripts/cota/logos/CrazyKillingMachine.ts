import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import {
    activePlayerState,
    allArtifacts,
    allCreatures,
    destroyCards,
    discardTopCard,
    inactivePlayerState
} from "../../ScriptUtils"
import { CardInGame } from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
    // Action: Discard the top card of each player’s deck.
    // For each of those cards, destroy a creature or artifact of that card’s house, if able.
    // If 2 cards are not destroyed as a result of this, destroy Crazy Killing Machine.
    action: {
        perform: (state: GameState) => {
            const friendlyDiscard = discardTopCard(state, activePlayerState(state))
            const enemyDiscard = discardTopCard(state, inactivePlayerState(state))
            return {
                validTargets: (state: GameState) => {
                    return (allCreatures(state) as CardInGame[])
                        .concat(allArtifacts(state) as CardInGame[])
                        .filter(x => x.backingCard.house === friendlyDiscard.backingCard.house)
                },
                perform: (state: GameState, config0: CardActionConfig) => {
                    return {
                        validTargets: (state: GameState) => {
                            return (allCreatures(state) as CardInGame[])
                                .concat(allArtifacts(state) as CardInGame[])
                                .filter(x => x.backingCard.house === enemyDiscard.backingCard.house && x.id !== config0.targets[0].id)
                        },
                        perform: (state: GameState, config1: CardActionConfig) => {
                            const targets = config0.targets.concat(config1.targets)
                            destroyCards(state, targets)
                            if (targets.length !== 2) destroyCards(state, [config0.thisCard])
                        }
                    }
                }
            }
        }
    }
}
cardScripts.scripts.set("crazy-killing-machine", cardScript)