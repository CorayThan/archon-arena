import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, friendlyArtifacts, friendlyCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"
import { CardInGame } from "../../../shared/gamestate/CardInGame"
import { House } from "../../../shared/keyforge/house/House"
import { Artifact } from "../../../shared/gamestate/Artifact"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.)
    // Fight/Reap: You may play or use a Brobnar card this turn.
    //TODO enableUseOrPlay
    power: () => 1,
    elusive: () => true,
    reap: {
        validTargets: (state: GameState) => {
            const creatures = friendlyCreatures(state).filter(x => (x as Creature).backingCard.house === House.Brobnar)
            const artifacts = friendlyArtifacts(state).filter(x => (x as Artifact).backingCard.house === House.Brobnar)
            const cards = activePlayerState(state).hand.filter(x => (x as CardInGame).backingCard.house === House.Brobnar)
            return cards.concat(creatures).concat(artifacts)
        },
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            (config.targets[0] as CardInGame).house = House.Sanctum
        }
    },
    fight: {
        validTargets: (state: GameState) => {
            const creatures = friendlyCreatures(state).filter(x => (x as Creature).backingCard.house === House.Brobnar)
            const artifacts = friendlyArtifacts(state).filter(x => (x as Artifact).backingCard.house === House.Brobnar)
            const cards = activePlayerState(state).hand.filter(x => (x as CardInGame).backingCard.house === House.Brobnar)
            return cards.concat(creatures).concat(artifacts)
        },
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            (config.targets[0] as CardInGame).house = House.Sanctum
        }
    },
    atEndOfYourTurn: {
        perform: (state: GameState) => {
            //TODO figure out how to save the card i switched otherwise i'll just rest all the cards
            const creatures = friendlyCreatures(state).filter(x => (x as Creature).backingCard.house === House.Brobnar)
            const artifacts = friendlyArtifacts(state).filter(x => (x as Artifact).backingCard.house === House.Brobnar)
            const cards = activePlayerState(state).hand.filter(x => (x as CardInGame).backingCard.house === House.Brobnar)
            const allCards = cards.concat(creatures).concat(artifacts)
                .filter(x => (x as CardInGame).backingCard.house !== (x as CardInGame).house)
            allCards.forEach(x => (x as CardInGame).house = (x as CardInGame).backingCard.house)
        }
    }
}

cardScripts.scripts.set("brobnar-ambassador", cardScript)