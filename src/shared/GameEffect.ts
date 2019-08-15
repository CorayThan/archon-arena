import { House } from "./keyforge/house/House"

export interface Effect {
    house?: House
    type: EffectType
}

export enum EffectType {
    NO_PLAY_CREATURES = "Can't play creatures",
    NO_PLAY_ACTIONS = "Can't play actions",
    NO_USE_CARDS = "Can't use cards",
    NO_FIGHT = "Can't fight",
    NO_CREATURE_TEXTBOX = "Creatures do not have text",
    NO_PLAY = "Can't play cards",
    CANT_CHOOSE_HOUSE = "Can't choose house",
    NO_REAP_WITH_HOUSE = "Can't reap with house",
}
