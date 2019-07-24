import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import {
    activePlayerState,
    allCreatures,
    dealDamage,
    inactivePlayerState
} from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Deal 2D to a creature and move it to either flank of its controller’s battleline.
    power: () => 4,
    armor: () => 1,
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            dealDamage(config.targets as Creature[], 2)
            const playerState = config.targets[0].ownerId === activePlayerState(state).player.id ? activePlayerState(state) : inactivePlayerState(state)
            const index = playerState.creatures.findIndex(x => x.id === (config.targets[0] as Creature).id)
            const creature = playerState.creatures.slice(index, index + 1)
            playerState.creatures = playerState.creatures.splice(index, 1)
            //TODO add choice for which flank to move the creature to
            playerState.creatures = playerState.creatures.concat(creature)
        }
    }
}

cardScripts.scripts.set("tyxl-beambuckler", cardScript)