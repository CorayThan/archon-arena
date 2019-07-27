import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Skirmish. Creatures to the left of Panpaca, Jaga in the battleline gain skirmish.
    power: () => 3,
    skirmish: () => true,
}
cardScripts.scripts.set("panpaca-jaga", cardScript)