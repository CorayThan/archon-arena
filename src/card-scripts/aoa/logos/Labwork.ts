import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { CardInGame } from "../../../shared/gamestate/CardInGame"
import { GameState, PlayerState } from "../../../shared/gamestate/GameState"
import { activePlayerState, inactivePlayerState, putInArchives, archiveTopCardOfDeck } from "../../ScriptUtils"
import { exec } from "../../../game/Actions/Actions"

const cardScript: CardScript = {
  amber: () => 1,
  onPlay: {
    perform: (state, config) => {
      const target = config!.targets![0]
      putInArchives(state, target, true)
    }
  }
}

cardScripts.scripts.set("labwork", cardScript)
