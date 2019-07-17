import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {activePlayerState, allCreatures, healCreature, putInHand} from "../../ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"
import {CardInGame} from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
    action: {
        //TODO "Action: Fully heal an Ancient Bear.
        //If there are no Ancient Bears in play, search your deck and discard pile
        //and put each Ancient Bear from them into your hand.
        //If you do, shuffle your discard pile into your deck
        validTargets: (state) => allCreatures(state).filter(card => card.backingCard.card_title === "Ancient Bear"),
        numberOfTargets: () => 1,
        perform: (state, config) => {
            if (config.targets.length > 0) {
                healCreature(config.targets[0], (config.targets[0] as Creature).tokens.damage)
            } else {
                activePlayerState(state).discard.filter(card => card.backingCard.card_title === "Ancient Bear")
                    .forEach(bear => putInHand(bear as CardInGame))
                //TODO SHUFFLE discard into deck
            }
        }
    }
}

cardScripts.scripts.set("bear-flute", cardScript)