import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { House } from "../../../shared/keyforge/house/House"
import { activePlayerState } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // After you play another Mars creature, fully heal Tunk.
    power: () => 6,
    armor: () => 1,
    cardPlayed: {
        perform: (state: GameState, config: CardActionConfig) => {
            const triggerCard = config.triggerCard
            if (activePlayerState(state).player.id !== config.thisCard.ownerId) return
            if (triggerCard.backingCard.house === House.Mars && triggerCard.backingCard.cardType === 'Creature') {
                (config.thisCard as Creature).tokens.damage = 0
            }
        }
    }
}

cardScripts.scripts.set("tunk", cardScript)