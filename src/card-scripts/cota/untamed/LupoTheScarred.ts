import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {dealDamage, enemyCreatures} from "../../ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    power: () => 6,
    skirmish: () => true,
    onPlay: {
        validTargets: enemyCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            config.targets.forEach(target => dealDamage(target as Creature, 2))
        }
    }

}

cardScripts.scripts.set("lupo-the-scarred", cardScript)