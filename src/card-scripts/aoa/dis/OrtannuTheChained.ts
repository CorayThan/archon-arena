import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, allCreatures, dealDamageWithSplash, putInHand } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Reap: Return each copy of Ortannu’s Binding from your discard pile to your hand.
    // For each one returned this way, deal 2D to a creature, with 2D splash.
    power: () => 7,
    reap: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            const targets = activePlayerState(state).discard
                .filter(x => x.backingCard.cardTitle === "Ortannu’s Binding")
            putInHand(state, targets)
            dealDamageWithSplash(state, config.targets[0] as Creature, 2, 2)
        }
    }
}
cardScripts.scripts.set("ortannu-the-chained", cardScript)