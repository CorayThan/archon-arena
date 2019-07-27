import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    //TODO not quite right yet
    cardPlayed: {
        perform: (state: GameState, config: CardActionConfig) => {
            const triggerCard = config.triggerCard
            if (activePlayerState(state).player.id !== config.thisCard.ownerId) return
            if (triggerCard.backingCard.cardType === 'Creature') {
                modifyAmber(activePlayerState(state), 1)
            }
        }
    }
}

cardScripts.scripts.set("full-moon", cardScript)