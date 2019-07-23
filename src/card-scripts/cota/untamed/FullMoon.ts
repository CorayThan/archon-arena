import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { activePlayerState, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    //TODO not quite right yet
    cardPlayed: {
        perform: (state, config) => {
            const triggerCard = config.triggerCard
            if (activePlayerState(state).player.id !== config.thisCard.ownerId) return
            if (triggerCard.backingCard.cardType === 'Creature') {
                modifyAmber(activePlayerState(state), 1)
            }
        }
    }
}

cardScripts.scripts.set("full-moon", cardScript)