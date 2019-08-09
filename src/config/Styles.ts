import { createMuiTheme } from "@material-ui/core"
import { localStorageStore } from "../stores/LocalStorageStore"
import { FontsConfig } from "./FontsConfig"

const makeTheme = () => createMuiTheme({
    palette: {
        type: localStorageStore.lightTheme ? undefined : "dark",
        background: {
            default: "#000000"
        },

        primary: {
            light: "#f05545",
            main: "#b71c1c",
            dark: "#7f0000",
            contrastText: "#fff",
        },
        secondary: {
            light: "#fff350",
            main: "#ffc107",
            dark: "#c79100",
            contrastText: "#000",
        },
    },
    typography: {
        fontFamily: FontsConfig.BODY,
        h1: {
            fontFamily: FontsConfig.TITLE
        },
        h2: {
            fontFamily: FontsConfig.TITLE
        },
        h3: {
            fontFamily: FontsConfig.TITLE
        },
        h4: {
            fontFamily: FontsConfig.TITLE
        },
        h5: {
            fontFamily: FontsConfig.TITLE
        },
    },
})

export let theme = makeTheme()

export const updateTheme = () => {
    theme = makeTheme()
}
