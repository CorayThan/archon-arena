import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { dealDamage, enemyCreatures, totalPower } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Before Fight: Choose a creature. Gabos Longarms deals damage to that creature rather than the one it is fighting.
    power: () => 5,
    //TODO damage to attacked = 0, also elusive FUCKERY
    beforeFight: {
        validTargets: enemyCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            const damage = totalPower(config.thisCard as Creature)
            //const elusive = attacked creature.elusive
            dealDamage(config.targets as Creature[], damage)
        }
    }
}
cardScripts.scripts.set("gabos-longarms", cardScript)