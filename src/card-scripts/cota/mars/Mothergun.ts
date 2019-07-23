import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { activePlayerState, dealDamage, enemyCreatures, revealCards } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Action: Reveal any number of Mars cards from your hand. Deal damage to a creature equal to the number of Mars cards revealed this way.
    //TODO this doesn't let you select the number of cards to reveal.
    action: {
        validTargets: enemyCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            const revealedCards = activePlayerState(state).hand.filter(x => x.backingCard.house === House.Mars)
            revealCards(state, revealedCards)
            dealDamage(config.targets as Creature[], revealedCards.length)
        }
    }
}

cardScripts.scripts.set("mothergun", cardScript)