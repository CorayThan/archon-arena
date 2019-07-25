import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    onPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            const target = config.targets![0] as Creature
            target.tokens.power += target.tokens.damage
            target.tokens.damage = 0
        }
    },
    atEndOfYourTurn: {
        perform: (state: GameState, config: CardActionConfig) => {
            if ((config.thisCard as Creature).tokens.power > 0)
                (config.thisCard as Creature).tokens.power -= 1
        }
    }
}

cardScripts.scripts.set("cybergiant-rig", cardScript)
