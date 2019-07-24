import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { activePlayerState, drawCard, dealDamage } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature";

const cardScript: CardScript = {
    onPlay: {
        perform: (state, config) => {
            const target = config!.targets![0]! as Creature
            dealDamage(target, 1)
            if (target.tokens.damage === target.power) {
                drawCard(state)
            }
        }
    }
}

cardScripts.scripts.set("poke", cardScript)

