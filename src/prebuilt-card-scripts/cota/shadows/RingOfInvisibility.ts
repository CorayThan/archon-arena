import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // This creature gains elusive and skirmish.
    amber: () => 1,
}
cardScripts.scripts.set("ring-of-invisibility", cardScript)