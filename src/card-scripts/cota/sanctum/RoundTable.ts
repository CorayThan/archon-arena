import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, alterArmor, getCardsWithTrait, giveTaunt } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Each friendly Knight creature gets +1 power and gains taunt.
    amber: () => 1,
    staticEffect: (state: GameState) => {
        const knights = getCardsWithTrait(allCreatures(state), 'Knight')
        alterArmor(knights as Creature[], 1)
        giveTaunt(knights as Creature[])
    }
}

cardScripts.scripts.set("round-table", cardScript)