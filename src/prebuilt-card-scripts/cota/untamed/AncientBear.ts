import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Assault 2.(Before this creature attacks, deal 2<D> to the attacked enemy.)
    power: () => 5,
}
cardScripts.scripts.set("ancient-bear", cardScript)