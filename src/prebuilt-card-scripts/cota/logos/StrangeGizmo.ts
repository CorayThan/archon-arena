import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // After you forge a key, destroy each creature and artifact.
    amber: () => 1,
}
cardScripts.scripts.set("strange-gizmo", cardScript)