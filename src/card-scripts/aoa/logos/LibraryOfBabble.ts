import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState, PlayerState } from "../../../shared/gamestate/GameState"
import { activePlayerState, inactivePlayerState, drawCard } from "../../ScriptUtils"
import { exec } from "../../../game/Actions/Actions"

const cardScript: CardScript = {
  action: {
    perform: (state, config) => {
      drawCard(state)
    }
  }
}

cardScripts.scripts.set("library-of-babble", cardScript)
