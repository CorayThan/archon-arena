import { cardScripts } from "../../CardScripts"
import { CardScript} from "../../types/CardScript"
import { allCreatures, destroyCard, activePlayerState, gainChains } from "../../ScriptUtils"

const cardScript: CardScript = {
    onPlay: {
        perform: (state) => {
        	const creaturesInPlay = allCreatures(state)
        	creaturesInPlay
        	.filter(creature => creature.tokens.damage === 0)
        	.forEach(creature => destroyCard(creature))
        	gainChains(activePlayerState(state), 3)
        }
    }
}

cardScripts.scripts.set("cowards-end", cardScript)
