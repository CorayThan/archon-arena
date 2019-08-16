import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, destroyCards, getLeastPowerful } from "../../ScriptUtils"

const effect = {
    validTargets: (state: GameState) => getLeastPowerful(allCreatures(state)),
    numberOfTargets: () => 1,
    perform: (state: GameState, config: CardActionConfig) => {
        destroyCards(state, config.targets)
    }
}

const cardScript: CardScript = {
    // Play/Fight/Reap: Destroy the least powerful creature.
    power: () => 5,
    onPlay: effect,
    reap: effect,
    fight: effect
}

cardScripts.scripts.set("horseman-of-famine", cardScript)