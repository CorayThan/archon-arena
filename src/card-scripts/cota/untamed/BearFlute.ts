import { CardActionConfig, CardScript } from "../../types/CardScript"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, allCreatures, healCreatures, putInHand, shuffleDeck } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    //"Action: Fully heal an Ancient Bear.
    //If there are no Ancient Bears in play, search your deck and discard pile
    //and put each Ancient Bear from them into your hand.
    //If you do, shuffle your discard pile into your deck
    action: {
        validTargets: (state: GameState) => allCreatures(state).filter(card => card.backingCard.cardTitle === "Ancient Bear"),
        numberOfTargets: () => 1,
        perform: (state: GameState, config0: CardActionConfig) => {
            if (config0.targets.length > 0) {
                healCreatures(config0.targets as Creature[], (config0.targets[0] as Creature).tokens.damage)
            } else {
                const bears = activePlayerState(state).discard
                    .concat(activePlayerState(state).library)
                    .filter(card => card.backingCard.cardTitle === "Ancient Bear")
                return {
                    validTargets: () => bears,
                    numberOfTargets: () => bears.length,
                    upToTargets: () => true,
                    perform: (state: GameState, config1: CardActionConfig) => {
                        putInHand(state, config1.targets)
                        shuffleDeck(activePlayerState(state))
                    }

                }
            }
        }
    }
}
cardScripts.scripts.set("bear-flute", cardScript)