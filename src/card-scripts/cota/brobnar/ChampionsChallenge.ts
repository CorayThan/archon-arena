import { cardScripts } from "../../CardScripts"
import { CardScript } from "../../types/CardScript"
import {
    getMostPowerful,
    enemyCreatures,
    friendlyCreatures,
    destroyCard,
    readyCreature,
    fightUsingCreature
} from "../../ScriptUtils"

const cardScript: CardScript = {
    onPlay: {
        perform: (state) => {
            if (enemyCreatures(state).length > 0) {
                const mostPowerfulEnemy = getMostPowerful(enemyCreatures(state), 1)[0]
                enemyCreatures(state)
                    .filter(creature => creature.id !== mostPowerfulEnemy.id)
                    .forEach(creature => destroyCard(state, creature))
            }
            if (friendlyCreatures(state).length > 0) {
                const mostPowerfulFriendly = getMostPowerful(friendlyCreatures(state), 1)[0]
                friendlyCreatures(state)
                    .filter(creature => creature.id !== mostPowerfulFriendly.id)
                    .forEach(creature => destroyCard(state, creature))
                readyCreature(mostPowerfulFriendly)
                fightUsingCreature(mostPowerfulFriendly)
            }
        }
    }
}

cardScripts.scripts.set("champions-challenge", cardScript)
