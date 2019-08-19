import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import {addFightAbility, friendlyCreatures, readyCreature} from "../../ScriptUtils";
import {House} from "../../../shared/keyforge/house/House";
import {Creature} from "../../../shared/gamestate/Creature";

const cardScript: CardScript = {
    onPlay: {
        validTargets: (state: GameState) => {
            return friendlyCreatures(state).filter(creature => creature.backingCard.house === House.Brobnar)
        },
        perform: (state: GameState, config: CardActionConfig) => {
            addFightAbility(config.targets[0] as Creature, {
                perform: (state: GameState, config: CardActionConfig) => {
                    readyCreature(config.thisCard as Creature)
                }
            })
        }
    }
}

cardScripts.scripts.set("into-the-fray", cardScript)
