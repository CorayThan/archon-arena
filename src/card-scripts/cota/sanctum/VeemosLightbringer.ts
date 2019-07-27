import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, destroyCards } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"
import { CardInGame } from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
    // Play: Destroy each elusive creature.
    power: () => 6,
    onPlay: {
        perform: (state: GameState) => {
            const targets = allCreatures(state)
                .filter(x => (x as Creature).elusive)
            destroyCards(state, targets as CardInGame[])
        }
    }
}

cardScripts.scripts.set("veemos-lightbringer", cardScript)