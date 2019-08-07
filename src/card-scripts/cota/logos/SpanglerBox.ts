import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, allCreatures, inactivePlayerState, moveCreature, removeAndReturn } from "../../ScriptUtils"
import { Artifact } from "../../../shared/gamestate/Artifact"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Action: Purge a creature in play. If you do, your opponent gains control of Spangler Box.
    // If Spangler Box leaves play, return to play all cards purged by Spangler Box.
    //TODO faceup cardsUnder
    action: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            const spangler = config.thisCard as Artifact
            const index = activePlayerState(state).artifacts
                .findIndex(x => x.id === spangler.id)
            const target = removeAndReturn(state, config.targets[0])
            spangler.cardsUnderneath.concat(target)
            activePlayerState(state).artifacts.splice(index, 1)
            inactivePlayerState(state).artifacts.concat(spangler)
        }
    },
    onLeavesPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            const targets = (config.thisCard as Artifact).cardsUnderneath
            targets.forEach(x => {
                const playerState = activePlayerState(state).player.id === x.ownerId ? activePlayerState(state) : inactivePlayerState(state)
                moveCreature(state, playerState, x as Creature)
            })
        }
    }
}
cardScripts.scripts.set("spangler-box", cardScript)