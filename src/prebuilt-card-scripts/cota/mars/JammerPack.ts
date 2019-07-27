import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // This creature gains, “Your opponent's keys cost +2<A>.“
    amber: () => 1,
}
cardScripts.scripts.set("jammer-pack", cardScript)