import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // During each turn in which Untamed is not your active house, you may play one Untamed card.
    power: () => 4,
}
cardScripts.scripts.set("witch-of-the-wilds", cardScript)