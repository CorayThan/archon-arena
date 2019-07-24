import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState, PlayerState } from "../../../shared/gamestate/GameState"
import { activePlayerState, inactivePlayerState } from "../../ScriptUtils"

const cardScript: CardScript = {
  onPlay: {
    perform: (state: GameState) => {
      const ownState = activePlayerState(state) as PlayerState
      const opponentState = inactivePlayerState(state) as PlayerState
      ownState.amber += 1
      if (opponentState.amber >= 8) {
        ownState.amber += 2
        opponentState.amber -= 2
      }
    }
  }
}

cardScripts.scripts.set("cutthroat-research", cardScript)
