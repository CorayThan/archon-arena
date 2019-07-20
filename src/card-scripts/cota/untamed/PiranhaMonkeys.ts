import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {allCreatures, dealDamage} from "../../types/ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    power: () => 2,
    onPlay: {
        perform: (state, config) => {
            const creatures = allCreatures(state).filter(card => (card as Creature).id !== config.thisCard.id)
            dealDamage(creatures, 2)
        }
    },
    reap: {
        perform: (state, config) => {
            const creatures = allCreatures(state).filter(card => (card as Creature).id !== config.thisCard.id)
            dealDamage(creatures, 2)
        }
    }
}

cardScripts.scripts.set("piranha-monkeys", cardScript)