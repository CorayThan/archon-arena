import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import {Creature} from "../../../shared/gamestate/Creature";
import {activePlayerState, allCreatures, dealDamage, modifyAmber} from "../../types/ScriptUtils"

const cardScript: CardScript = {
    power: () => 12,
    canBePlayed: (state) => {
        return activePlayerState(state).amber >= 7
    },
    fight: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            modifyAmber(activePlayerState(state), 1)
            dealDamage(config.targets[0] as Creature, 5)
        }
    },
    reap: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            modifyAmber(activePlayerState(state), 1)
            dealDamage(config.targets[0] as Creature, 5)
        }
    }
}

cardScripts.scripts.set("kelifi-dragon", cardScript)