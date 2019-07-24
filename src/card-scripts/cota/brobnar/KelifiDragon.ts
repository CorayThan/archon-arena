import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { activePlayerState, allCreatures, dealDamage, modifyAmber } from "../../ScriptUtils"
import { GameState } from "../../../shared/gamestate/GameState"
import { CardActionConfig } from "../../types/CardScript"

const effect = {
    validTargets: allCreatures,
    numberOfTargets: () => 1,
    perform: (state: GameState, config: CardActionConfig) => {
        modifyAmber(activePlayerState(state), 1)
        dealDamage(config.targets![0] as Creature, 5)
    }
}

const cardScript: CardScript = {
    power: () => 12,
    canBePlayed: (state: GameState, config: CardActionConfig) => {
        return activePlayerState(state).amber >= 7
    },
    fight: effect,
    reap: effect,
}

cardScripts.scripts.set("kelifi-dragon", cardScript)
