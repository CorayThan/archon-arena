import { cardScripts } from "../../CardScripts"
import { CardScript } from "../../types/CardScript"
import { Creature } from "../../../shared/gamestate/Creature"
import { friendlyCreatures, putInHand } from "../../ScriptUtils"
import { GameState  } from "../../../shared/gamestate/GameState"
import { CardActionConfig  } from "../../types/CardScript"

const effect = {
    validTargets: (state: GameState, config: CardActionConfig) => {
        const friendlies = friendlyCreatures(state)
        return friendlies .filter(creature => creature.traits.includes("Giant") && creature.id !== config.thisCard.id)

    },
    numberOfTargets: () => 1,
    perform: (state: GameState, config: CardActionConfig) => {
        const targetedGiant = config.targets![0] as Creature
        putInHand(targetedGiant)
    }
}

const cardScript: CardScript = {
    onPlay: effect,
    fight: effect,
    reap: effect,
}

cardScripts.scripts.set("drummernaut", cardScript)
