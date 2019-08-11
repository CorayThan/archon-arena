import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import {
    activePlayerState,
    cardsPlayedThisTurn,
    destroyCard,
    friendlyCreatures,
    getCardsWithTrait,
    putInArchives
} from "../../ScriptUtils"
import { CardInGame } from "../../../shared/gamestate/CardInGame"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Play: Archive each friendly Knight creature in play. Omni: If you have played 7 or more Sanctum cards this turn, sacrifice Epic Quest and forge a key at no cost.
    onPlay: {
        perform: (state: GameState) => {
            putInArchives(state, getCardsWithTrait(friendlyCreatures(state), "Knight"), true)
        }
    },
    omni: {
        perform: (state: GameState, config: CardActionConfig) => {
            //TODO track cards played this turn
            if (cardsPlayedThisTurn(state)
                .filter(card => (card as CardInGame).backingCard.house === House.Sanctum).length > 7) {
                activePlayerState(state).keys += 1
            }
            destroyCard(state, config.thisCard)
        }
    }
}

cardScripts.scripts.set("epic-quest", cardScript)
