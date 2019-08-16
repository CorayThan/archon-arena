import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures } from "../../ScriptUtils"

const effect = {
    perform: (state: GameState) => {
        const targets = allCreatures(state).filter(x => x.traits.includes("Human"))
        targets.forEach(x => x.tokens.damage += 3)

    }
}
const cardScript: CardScript = {
    // Fight/Reap: Deal 3<D> to each Human creature. This damage cannot be prevented by armor.
    //TODO figure out Shadow Self trigger
    power: () => 3,
    reap: effect,
    fight: effect
}

cardScripts.scripts.set("qyxxlyx-plague-master", cardScript)