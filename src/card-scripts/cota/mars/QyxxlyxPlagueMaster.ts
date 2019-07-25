import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Fight/Reap: Deal 3<D> to each Human creature. This damage cannot be prevented by armor.
    power: () => 3,
    reap: {
        perform: (state: GameState) => {
            const targets = allCreatures(state).filter(x => x.traits.includes("Human"))
            targets.forEach(x => x.tokens.damage += 3)

        }
    },
    fight: {
        perform: (state: GameState) => {
            const targets = allCreatures(state).filter(x => x.traits.includes("Human"))
            targets.forEach(x => x.tokens.damage += 3)
        }
    }
}

cardScripts.scripts.set("qyxxlyx-plague-master", cardScript)