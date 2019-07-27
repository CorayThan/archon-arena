import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, dealDamage, enemyCreatures } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Deal 1<D> to each creature. Deal an additional 3<D> to each creature if your opponent forged a key on their previous turn.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            dealDamage(allCreatures(state), 1)
            const keyForged = true //TODO figure out this
            if (keyForged) dealDamage(enemyCreatures(state), 3)
        }
    },
}
cardScripts.scripts.set("tendrils-of-pain", cardScript)