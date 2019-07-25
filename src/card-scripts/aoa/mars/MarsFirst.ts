import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { friendlyCreatures, readyCreatures, useCreatures } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Ready and use a friendly Mars creature.
    amber: () => 1,
    onPlay: {
        validTargets: (state) => friendlyCreatures(state).filter(x => x.backingCard.house === House.Mars),
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            readyCreatures(config.targets as Creature[])
            useCreatures(config.targets as Creature[])
        }
    }
}

cardScripts.scripts.set("mars-first", cardScript)