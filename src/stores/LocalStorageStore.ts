import { computed, observable } from "mobx"
import { updateTheme } from "../config/Styles"

enum Keys {
    THEME_COLOR = "THEME_COLOR",
    CHAT_DRAWER_EXPANDED = "CHAT_DRAWER_EXPANDED"
}

class LocalStorageStore {

    @observable
        // @ts-ignore
    lightTheme: boolean

    @observable
        // @ts-ignore
    chatDrawerExpanded: boolean

    private localStorage = window.localStorage

    constructor() {
        this.findIfThemeIsLight()
        this.findChatDrawerExpanded()
    }

    private findIfThemeIsLight = () => {
        const lightTheme = this.localStorage.getItem(Keys.THEME_COLOR)
        this.lightTheme = lightTheme == null || lightTheme === "true"
    }

    setLightTheme = (lightTheme: boolean) => {
        this.localStorage.setItem(Keys.THEME_COLOR, lightTheme.toString())
        this.findIfThemeIsLight()
        updateTheme()
    }

    private findChatDrawerExpanded = () => {
        const expanded = this.localStorage.getItem(Keys.CHAT_DRAWER_EXPANDED)
        this.chatDrawerExpanded = expanded == null || expanded === "true"
    }

    setChatDrawerExpanded = (expanded: boolean) => {
        this.localStorage.setItem(Keys.CHAT_DRAWER_EXPANDED, expanded.toString())
        this.findChatDrawerExpanded()
    }

    @computed
    get chatWidth(): number {
        if (this.chatDrawerExpanded) {
            return 440
        } else {
            return 64
        }
    }
}

export const localStorageStore = new LocalStorageStore()