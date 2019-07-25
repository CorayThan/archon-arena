import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // At the end of your turn, if Titan Librarian is not on a flank, archive a card.
    power: () => 4,
}
cardScripts.scripts.set("titan-librarian", cardScript)