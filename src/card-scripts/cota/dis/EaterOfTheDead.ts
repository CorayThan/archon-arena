import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, alterPower, inactivePlayerState, purgeCards } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const effect = {
    validTargets: (state: GameState) => activePlayerState(state).discard.concat(inactivePlayerState(state).discard)
        .filter(x => x.backingCard.cardType === "Creature"),
    numberOfTargets: () => 1,
    perform: (state: GameState, config: CardActionConfig) => {
        if (config.targets.length > 0) {
            purgeCards(state, config.targets)
            alterPower([config.thisCard] as Creature[], 1)
        }
    }
}

const cardScript: CardScript = {
    // Fight/Reap: Purge a creature from a discard pile. If you do, put a +1 power counter on Eater of the Dead.
    power: () => 4,
    reap: effect,
    fight: effect
}
cardScripts.scripts.set("eater-of-the-dead", cardScript)