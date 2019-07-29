import {CardActionConfig, CardScript} from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { Creature } from "../../../shared/gamestate/Creature"
import {activePlayerState, allCreatures, dealDamage, friendlyPlayer} from "../../ScriptUtils"
import {House} from "../../../shared/keyforge/house/House";

const cardScript: CardScript = {
    power: () => 6,
    onDiscard: {
        validTargets: allCreatures,
        numberOfTargets: (state: GameState, config: CardActionConfig) => {
            return activePlayerState(state) === friendlyPlayer(state, config.thisCard)
                && config.triggerCard.backingCard.house === House.Brobnar
                && config.triggerCard.ownerId === activePlayerState(state).player.id
                ? 1
                : 0
        },
        upToTargets: () => true,
        perform: (state: GameState, config: CardActionConfig) => {
            dealDamage(config.targets as Creature[], 4)
        }
    }
}

cardScripts.scripts.set("rock-hurling-giant", cardScript)
