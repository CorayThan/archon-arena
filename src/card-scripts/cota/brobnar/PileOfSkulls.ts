import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import {activePlayerState, captureAmber, enemyPlayer, friendlyCreatures, friendlyPlayer} from "../../ScriptUtils";
import {Creature} from "../../../shared/gamestate/Creature";

const cardScript: CardScript = {
    onCreatureDestroyed: {
        perform: (state: GameState, config: CardActionConfig) => {
            if (activePlayerState(state) === enemyPlayer(state, config.thisCard)
            &&  activePlayerState(state) === friendlyPlayer(state, config.triggerCard)) {
                return {
                    validTargets: friendlyCreatures,
                    numberOfTargets: (state: GameState) => {
                        return Math.min(1, activePlayerState(state).amber)
                    },
                    perform: (state:GameState, config: CardActionConfig) => {
                        captureAmber(state, config.targets[0] as Creature, 1)
                    }
                }
            }
        }
    }
}

cardScripts.scripts.set("pile-of-skulls", cardScript)
