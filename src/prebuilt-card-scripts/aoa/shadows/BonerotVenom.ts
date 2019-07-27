import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // After this creature is used, deal 2D to it.
    amber: () => 1,
}
cardScripts.scripts.set("bonerot-venom", cardScript)