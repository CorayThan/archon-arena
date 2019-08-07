import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { friendlyCreatures, useCreatures } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"
import { Creature } from "../../../shared/gamestate/Creature"

const effect = {
    validTargets: (state: GameState) => friendlyCreatures(state).filter(x => x.backingCard.house !== House.Mars),
    numberOfTargets: () => 1,
    perform: (state: GameState, config: CardActionConfig) => {
        useCreatures(config.targets as Creature[])
    }
}
const cardScript: CardScript = {
    // Fight/Reap: Use a friendly non-Mars creature.
    power: () => 3,
    reap: effect,
    fight: effect
}

cardScripts.scripts.set("ulyq-megamouth", cardScript)