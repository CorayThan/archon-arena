import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { activePlayerState, drawCard } from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 2,
    reap: {
        perform: (state, config) => {
            const friendlyCreatures = activePlayerState(state).creatures
            friendlyCreatures.forEach(creature => {
                if (creature.backingCard.house === "Logos") {
                    drawCard(state)
                }
            })
        }
    }
}

cardScripts.scripts.set("professor-sutterkin", cardScript)

