import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { activePlayerState, gainChains } from "../../ScriptUtils"

const cardScript: CardScript = {
    // This creature gets +2 armor and +2 power. This creature gains skirmish and, “Fight: Gain 1 chain.”
    power: () => 2,
    armor: () => 2,
    skirmish: () => true,
    fight: {
        perform: (state) => {
            gainChains(activePlayerState(state), 1)
        }
    }
}

cardScripts.scripts.set("killzord-mk-9001", cardScript)