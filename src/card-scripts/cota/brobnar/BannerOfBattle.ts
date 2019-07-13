import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { friendlyCreatures } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    amber: 4,
    staticEffect: (state) => {
        friendlyCreatures(state).forEach(creature => creature.power += 1)
    }
}

cardScripts.scripts.set("banner-of-battle", cardScript)
