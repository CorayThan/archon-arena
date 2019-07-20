import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {destroyCards, friendlyCreatures, useCreatures} from "../../ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"
import {House} from "../../../shared/keyforge/house/House"
import {CardInGame} from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
    // Omni: Sacrifice Sigil of Brotherhood. For the remainder of the turn, you may use friendly Sanctum creatures.
    amber: () => 1,
    omni: {
        perform: (state, config) => {
            //TODO not really going to work
            useCreatures(friendlyCreatures(state).filter(creature => (creature as Creature).backingCard.house = House.Sanctum))
            destroyCards(state, [config.thisCard] as CardInGame[])
        }
    }
}

cardScripts.scripts.set("sigil-of-brotherhood", cardScript)