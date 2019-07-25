import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // This creature gains assault 2. (Before this creature attacks, deal 2<D> to the attacked enemy.)
    amber: () => 1,
}
cardScripts.scripts.set("way-of-the-bear", cardScript)