import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { friendlyCreatures } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    power: () => 6,
    staticEffect: (state, config) => {
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
