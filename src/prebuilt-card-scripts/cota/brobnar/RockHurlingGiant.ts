import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // During your turn, each time you discard a Brobnar card from your hand, you may deal 4<D> to a creature.
    power: () => 6,
}
cardScripts.scripts.set("rock-hurling-giant", cardScript)