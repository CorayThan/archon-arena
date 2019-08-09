import { observable } from "mobx"
import { updateTheme } from "../config/Styles"
import { log } from "../Utils"

enum Keys {
    THEME_COLOR = "THEME_COLOR",
}

class LocalStorageStore {

    @observable
    // @ts-ignore
    lightTheme: boolean

    private localStorage = window.localStorage

    constructor() {
        this.findIfThemeIsLight()
    }

    private findIfThemeIsLight = () => {
        const lightTheme = this.localStorage.getItem(Keys.THEME_COLOR)
        this.lightTheme = lightTheme == null || lightTheme === "true"
        log.debug("Theme is light: " + this.lightTheme)
    }

    setLightTheme = (lightTheme: boolean) => {
        this.localStorage.setItem(Keys.THEME_COLOR, lightTheme.toString())
        this.findIfThemeIsLight()
        updateTheme()
    }
}

export const localStorageStore = new LocalStorageStore()