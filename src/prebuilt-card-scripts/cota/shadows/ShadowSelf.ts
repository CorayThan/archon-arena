import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Shadow Self deals no damage when fighting.  Damage dealt to non-Specter neighbors is dealt to Shadow Self instead.
    power: () => 9,
}
cardScripts.scripts.set("shadow-self", cardScript)