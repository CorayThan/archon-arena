import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // This creature cannot be used unless its controller has discarded a card this turn.
    amber: () => 1,
}
cardScripts.scripts.set("earthbind", cardScript)