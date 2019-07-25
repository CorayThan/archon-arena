import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // While your opponent does not control creatures from 3 different houses, their keys cost +2A.
}
cardScripts.scripts.set("proclamation-346-e", cardScript)