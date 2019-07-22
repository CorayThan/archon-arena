import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {inactivePlayerState} from "../../ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    power: () => 2,
    staticEffect: (state, config) => {
        (config.thisCard as Creature).tokens.power = (config.thisCard as Creature).tokens.power + (3 * (3 - inactivePlayerState(state).keys))
    }
}

cardScripts.scripts.set("mushroom-man", cardScript)