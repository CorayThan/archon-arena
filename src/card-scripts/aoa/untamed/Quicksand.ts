import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { destroyCard, enemyCreatures, friendlyCreatures, getMostPowerful } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Play: Destroy the most powerful creature controlled by each player who does not control a ready Untamed creature.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            if (friendlyCreatures(state).filter(creature => {
                ((creature as Creature).backingCard.house === House.Untamed) && (creature as Creature).ready
            }).length > 0) {
                getMostPowerful(friendlyCreatures(state))
                    .forEach(creature => destroyCard(state, creature))
            }
            if (enemyCreatures(state).filter(creature => {
                ((creature as Creature).backingCard.house === House.Untamed) && (creature as Creature).ready
            }).length > 0) {
                getMostPowerful(enemyCreatures(state))
                    .forEach(creature => destroyCard(state, creature))
            }
        }
    }
}

cardScripts.scripts.set("quicksand", cardScript)
