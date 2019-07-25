import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Mushroom Man gets +3 power for each unforged key you have.
    power: () => 2,
}
cardScripts.scripts.set("mushroom-man", cardScript)