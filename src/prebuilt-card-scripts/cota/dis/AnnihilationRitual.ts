import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // When a creature would enter a discard pile from play, it is purged instead.
    amber: () => 1,
}
cardScripts.scripts.set("annihilation-ritual", cardScript)