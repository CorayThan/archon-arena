import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // After you forge a key, deal 2<D> to each enemy creature.
    power: () => 5,
}
cardScripts.scripts.set("bilgum-avalanche", cardScript)