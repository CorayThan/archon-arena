import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // When you play this card, treat it as a copy of an action card in your opponent’s discard pile.
}
cardScripts.scripts.set("mimicry", cardScript)