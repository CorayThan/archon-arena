import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    onPlay: {
        perform: (state, config) => {
            const target = config.targets![0] as Creature
            target.tokens.power += target.tokens.damage
            target.tokens.damage = 0
        }
    },
    atEndOfYourTurn: {
        perform: (state, config) => {
            if ((config.thisCard as Creature).tokens.power > 0)
                (config.thisCard as Creature).tokens.power -= 1
        }
    }
}

cardScripts.scripts.set("cybergiant-rig", cardScript)
