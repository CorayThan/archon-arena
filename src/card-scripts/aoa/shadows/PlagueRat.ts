import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, dealDamage, getCardsWithoutTrait, getCardsWithTrait } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.)
    // Play: Each non-Rat creature is dealt 1D for each Rat creature in play.
    power: () => 1,
    elusive: () => true,
    onPlay: {
        perform: (state: GameState) => {
            const rats = getCardsWithTrait(allCreatures(state), "Rat")
            const targets = getCardsWithoutTrait(allCreatures(state), "Rat")
            dealDamage(targets as Creature[], rats.length)
        }
    }
}
cardScripts.scripts.set("plague-rat", cardScript)