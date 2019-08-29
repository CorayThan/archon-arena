import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { getNeighbors, putInArchives } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.)
    //Each of Archimedes’s neighbors gains, “Destroyed: Archive this creature.”
    power: () => 2,
    elusive: () => true,
    onCreatureDestroyed: {
        perform: (state: GameState, config: CardActionConfig) => {
            const neighbors = getNeighbors(state, config.thisCard as Creature)
            if (neighbors.some(creature => creature.id === config.triggerCard.id)) {
                putInArchives(state, [config.triggerCard], true)
            }
        }
    }
}
cardScripts.scripts.set("archimedes", cardScript)