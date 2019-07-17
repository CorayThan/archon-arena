import {cardScripts} from "../../CardScripts"
import {CardScript} from "../../types/CardScript"
import {
    destroyCard,
    enemyCreatures,
    fightUsingCreature,
    friendlyCreatures,
    getMostPowerful,
    readyCreature
} from "../../ScriptUtils"


const cardScript: CardScript = {
    onPlay: {
        perform: (state) => {
            if (enemyCreatures(state).length > 0) {
                const mostPowerfulEnemy = getMostPowerful(enemyCreatures(state), 1)[0]
                enemyCreatures(state)
                    .filter(creature => creature.id !== mostPowerfulEnemy.id)
                    .forEach(creature => destroyCard(creature))
            }
            if (friendlyCreatures(state).length > 0) {
                const mostPowerfulFriendly = getMostPowerful(friendlyCreatures(state), 1)[0]
                friendlyCreatures(state)
                    .filter(creature => creature.id !== mostPowerfulFriendly.id)
                    .forEach(creature => destroyCard(creature))
                readyCreature(mostPowerfulFriendly)
                fightUsingCreature(mostPowerfulFriendly)
            }
        }
    }
}

cardScripts.scripts.set("champions-challenge", cardScript)