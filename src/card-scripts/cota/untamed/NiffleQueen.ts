import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { friendlyCreatures } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    power: 6,
    staticEffect: (state, config) => {
        // TODO check action log for stolen or captured aember, fix game state?
        const friendlies = friendlyCreatures(state)
        friendlies
            .filter(friendly => friendly.id !== config!.thisCardId && friendly.traits.includes("beast"))
            .forEach(beast => beast.power += 1)
        friendlies
            .filter(friendly => friendly.id !== config!.thisCardId && friendly.traits.includes("niffle"))
            .forEach(niffle => niffle.power += 1)
    }
}

cardScripts.scripts.set("niffle-queen", cardScript)
