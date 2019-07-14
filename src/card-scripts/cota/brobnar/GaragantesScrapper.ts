import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {activePlayerState, dealDamage, enemyCreatures} from "../../types/ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    alpha: () => true,
    power: () => 3,
    onPlay: {
        validTargets: enemyCreatures,
        numberOfTargets: (state) => {
            return activePlayerState(state).amber < 3 ? 0 : 1
        },
        perform: (state, config) => {
            dealDamage(config.targets[0] as Creature, 3)
        }
    }
}

cardScripts.scripts.set("garagantes-scrapper", cardScript)