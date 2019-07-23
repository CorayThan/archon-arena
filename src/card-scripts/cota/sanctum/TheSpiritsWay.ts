import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { allCreatures, destroyCards } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"
import { CardInGame } from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
    // Play: Destroy each creature with power 3 or higher.
    onPlay: {
        perform: (state) => {
            const targets = allCreatures(state)
                .filter(x => ((x as Creature).power + (x as Creature).tokens.power) >= 5)
            destroyCards(state, targets as CardInGame[])
        }
    }
}

cardScripts.scripts.set("the-spirits-way", cardScript)