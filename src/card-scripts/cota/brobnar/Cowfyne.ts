import { cardScripts } from "../../types/CardScripts"
import { CardScript, TargetType, TargetArea } from "../../types/CardScript"
import { Creature } from "../../../shared/gamestate/Creature"
import { checkIfHasTargets, putOnTopOfDeck, enemyCreatures, getNeighbors, dealDamage } from "../../types/ScriptUtils"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    power: () =>  5,
    beforeFight: {
        perform: (state, config) => {
            const fightTarget = config.targets[0] as Creature
            const neighbors = getNeighbors(enemyCreatures(state), fightTarget)
            neighbors.forEach(neighbor => dealDamage(neighbor, 2))
        }
    }
}

cardScripts.scripts.set("cowfyne", cardScript)