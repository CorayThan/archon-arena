import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {activePlayerState, inactivePlayerState, modifyAmber, purgeCard} from "../../ScriptUtils"
import {CardInGame} from "../../../shared/gamestate/CardInGame"
import {House} from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Play: Purge each Untamed creature from each player’s discard pile. For each card purged this way, its owner gains 1A.
    amber: () => 1,
    onPlay: {
        perform: (state) => {
            [activePlayerState(state), inactivePlayerState(state)].forEach((playerState, index) => {
                const purgedCards = playerState.discard
                    .filter(card => (card as CardInGame).backingCard.house === House.Untamed)
                purgedCards.forEach(card => purgeCard(state, card, index === 0))
                modifyAmber(playerState, purgedCards.length)
            })
        }
    }
}

cardScripts.scripts.set("soldiers-to-flowers", cardScript)