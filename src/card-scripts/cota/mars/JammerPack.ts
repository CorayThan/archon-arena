import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { enemyPlayer } from "../../ScriptUtils"

const cardScript: CardScript = {
    // This creature gains, “Your opponent's keys cost +2<A>.“
    amber: () => 1,
    staticEffect: (state, config) => {
        enemyPlayer(state, config.thisCard).keyCost += 2
    }
}

cardScripts.scripts.set("jammer-pack", cardScript)