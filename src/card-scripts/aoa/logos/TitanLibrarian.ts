import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { CardInGame } from "../../../shared/gamestate/CardInGame"
import { GameState, PlayerState } from "../../../shared/gamestate/GameState"
import { activePlayerState, inactivePlayerState, putInArchives, archiveTopCardOfDeck, onFlank } from "../../ScriptUtils"
import { exec } from "../../../game/Actions/Actions"

const cardScript: CardScript = {
  power: () => 2,
  atEndOfYourTurn: {
    perform: (state, config) => {
      if (!onFlank) {
        putInArchives(state, config!.targets![0]!, true)
      }
    }
  }
}

cardScripts.scripts.set("titan-librarian", cardScript)
