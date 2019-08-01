import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import {
    activePlayerState,
    checkHouse,
    destroyCards,
    discardTopCard,
    enemyCards,
    friendlyCards
} from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"

const effect = {
    validTargets: enemyCards,
    numberOfTargets: () => 1,
    perform: (state: GameState, config0: CardActionConfig) => {
        return {
            validTargets: friendlyCards,
            numberOfTargets: () => 1,
            perform: (state: GameState, config1: CardActionConfig) => {
                destroyCards(state, config0.targets.concat(config1.targets))
                const discard = discardTopCard(state, activePlayerState(state))
                if (checkHouse(discard, House.Logos)) {
                    return effect
                }
            }
        }
    }
}
const cardScript: CardScript = {
    // Play/Fight/Reap: Destroy an enemy creature or artifact and a friendly creature or artifact.
    // Discard the top card of your deck. If that card is not a Logos card, trigger this effect again.
    power: () => 1,
    onPlay: effect,
    reap: effect,
    fight: effect
}
cardScripts.scripts.set("neutron-shark", cardScript)