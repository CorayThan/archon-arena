import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { House } from "../../../shared/keyforge/house/House"
import { allCreatures, stunCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Choose a house. Stun each creature of that house.
    amber: () => 1,
    onPlay: {
        selectFromChoices: Object.values(House),
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            const targets = allCreatures(state)
                .filter(x => (x as Creature).backingCard.house === config.selection)
            stunCreatures(targets)
        }
    }
}

cardScripts.scripts.set("blinding-light", cardScript)