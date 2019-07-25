import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { friendlyCreatures, putInHand } from "../../ScriptUtils"

const effect = {
    validTargets: (state: GameState, config: CardActionConfig) => {
        const friendlies = friendlyCreatures(state)
        return friendlies.filter(creature => creature.traits.includes("Giant") && creature.id !== config.thisCard.id)

    },
    numberOfTargets: () => 1,
    perform: (state: GameState, config: CardActionConfig) => {
        putInHand(state, config.targets!)
    }
}

const cardScript: CardScript = {
    onPlay: effect,
    fight: effect,
    reap: effect,
}

cardScripts.scripts.set("drummernaut", cardScript)
