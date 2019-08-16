import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allPlayerStates, checkHouse, modifyAmber, purgeCards } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Play: Purge each Untamed creature from each player’s discard pile. For each card purged this way, its owner gains 1A.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            allPlayerStates(state).forEach(playerState => {
                const targets = playerState.discard
                    .filter(x => checkHouse(x, House.Untamed) && x.backingCard.cardType === 'Creature')
                purgeCards(state, targets)
                modifyAmber(playerState, targets.length)
            })
        }
    }
}

cardScripts.scripts.set("soldiers-to-flowers", cardScript)