import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, playCards, putUnderCard } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Elusive. Play: Put a card from your hand facedown under Jargogle.
    // Destroyed: If it is your turn, play the card under Jargogle; otherwise, archive that card.
    power: () => 2,
    elusive: () => true,
    onPlay: {
        validTargets: (state: GameState) => activePlayerState(state).hand,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            putUnderCard(state, config.targets, config.thisCard as Creature)
        }
    },
    destroyed: {
        perform: (state: GameState, config: CardActionConfig) => {
            playCards(state, (config.thisCard as Creature).cardsUnderneath)
        }
    }
}
cardScripts.scripts.set("jargogle", cardScript)