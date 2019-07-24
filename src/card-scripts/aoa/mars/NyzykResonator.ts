import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { enemyPlayer, friendlyPlayer, getNeighbors } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // For each neighbor Nyzyk Resonator has, your opponent’s keys cost +2A.
    power: () => 2,
    armor: () => 1,
    staticEffect: (state, config) => {
        const targets = getNeighbors(friendlyPlayer(state, config.thisCard).creatures, config.thisCard as Creature)
        enemyPlayer(state, config.thisCard).keyCost += 2 * targets.length
    }
}

cardScripts.scripts.set("nyzyk-resonator", cardScript)