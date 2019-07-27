import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // During their “draw cards” step, each player refills their hand to 1 additional card.
    amber: () => 1,
}
cardScripts.scripts.set("the-howling-pit", cardScript)