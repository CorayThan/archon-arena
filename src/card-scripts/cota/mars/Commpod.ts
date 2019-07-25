import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, allCreatures, readyCreatures, revealCards } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Action: Reveal any number of Mars cards from your hand. For each card revealed this way, you may ready one Mars creature.
    // TODO this doesn't let you select the number of cards to reveal.
    action: {
        validTargets: (state) => allCreatures(state).filter(x => x.backingCard.house === House.Mars),
        numberOfTargets: (state) => activePlayerState(state).hand.filter(x => x.backingCard.house === House.Mars).length,
        perform: (state: GameState, config: CardActionConfig) => {
            const revealedCards = activePlayerState(state).hand.filter(x => x.backingCard.house === House.Mars)
            revealCards(state, revealedCards)
            readyCreatures(config.targets as Creature[])
        }
    }
}

cardScripts.scripts.set("commpod", cardScript)