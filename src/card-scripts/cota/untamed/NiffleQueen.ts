import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { friendlyCreatures } from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 6,
    staticEffect: (state: GameState, config: CardActionConfig) => {
        const friendlies = friendlyCreatures(state)
        friendlies
            .filter(friendly => friendly.id !== config!.thisCard!.id && friendly.traits.includes("beast"))
            .forEach(beast => beast.power += 1)
        friendlies
            .filter(friendly => friendly.id !== config!.thisCard!.id && friendly.traits.includes("niffle"))
            .forEach(niffle => niffle.power += 1)
    }
}

cardScripts.scripts.set("niffle-queen", cardScript)
