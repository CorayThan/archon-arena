import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { Creature } from "../../../shared/gamestate/Creature"
import { alterPower } from "../../ScriptUtils"

const cardScript: CardScript = {
    // This creature gains, “At the end of your turn, this creature loses a +1 power counter.”
    // Play: Fully heal this creature and give it a +1 power counter for each damage healed.
    onPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            const target = config.targets![0] as Creature
            alterPower(config.targets as Creature[], target.tokens.damage)
            target.tokens.damage = 0
        }
    },
    atEndOfYourTurn: {
        perform: (state: GameState, config: CardActionConfig) => {
            if ((config.thisCard as Creature).tokens.power > 0)
                alterPower([config.thisCard] as Creature[], -1)
        }
    }
}

cardScripts.scripts.set("cybergiant-rig", cardScript)
