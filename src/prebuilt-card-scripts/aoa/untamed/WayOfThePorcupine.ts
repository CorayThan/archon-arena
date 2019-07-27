import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // This creature gains Hazardous 3. (Before this creature is attacked, deal 3D to the attacking enemy.)
    amber: () => 1,
    hazardous: () => 0,
}
cardScripts.scripts.set("way-of-the-porcupine", cardScript)