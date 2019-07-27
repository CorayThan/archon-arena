import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, alterPower } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Choose a creature. For each damaged creature, give the chosen creature two +1 power counters.
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            const targets = allCreatures(state)
                .filter(x => (x as Creature).tokens.damage > 0).length
            alterPower(config.targets as Creature[], targets)
        }
    }
}

cardScripts.scripts.set("martian-hounds", cardScript)