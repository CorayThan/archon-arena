import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, inactivePlayerState, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 3,
    cardPlayed: {
        perform: (state: GameState, config: CardActionConfig) => {
            const triggerCard = config.triggerCard
            if (activePlayerState(state).player.id === config.thisCard.ownerId) return
            if (triggerCard.backingCard.cardType === 'Creature') {
                modifyAmber(inactivePlayerState(state), 1)
            }
        }
    }
}

cardScripts.scripts.set("teliga", cardScript)
