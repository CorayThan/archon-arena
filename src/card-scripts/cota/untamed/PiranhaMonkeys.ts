import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {allCreatures, dealDamage} from "../../types/ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    power: () => 2,
    onPlay: {
        perform: (state, config) => {
            allCreatures(state).forEach(target => {
                if (target.id !== config.thisCard.id) dealDamage(target as Creature, 2)
            })
        }
    },
    reap: {
        perform: (state, config) => {
            allCreatures(state).forEach(target => {
                if (target.id !== config.thisCard.id) dealDamage(target as Creature, 2)
            })
        }
    }
}

cardScripts.scripts.set("piranha-monkeys", cardScript)