import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enemyCreatures, friendlyCreatures, putInDeck } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Play: Shuffle each Mars creature into its owner’s deck. Each player gains 1<A> for each creature shuffled into their deck this way.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            const friendlyTargets = friendlyCreatures(state)
                .filter(x => x.backingCard.house === House.Mars && x.backingCard.cardType === "Creature")
            const enemyyTargets = enemyCreatures(state)
                .filter(x => x.backingCard.house === House.Mars && x.backingCard.cardType === "Creature")
            putInDeck(state, friendlyTargets)
            putInDeck(state, enemyyTargets)
        }
    }
}

cardScripts.scripts.set("mating-season", cardScript)