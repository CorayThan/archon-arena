import * as WebFont from "webfontloader"

export class FontsConfig {

    static readonly TITLE = "Russo One"
    static readonly BODY = "Ubuntu"

    static loadFonts = () => {

        // Fonts we use get loaded here.
        WebFont.load({
            google: {
                families: [`${FontsConfig.TITLE}:300,400,500`, `${FontsConfig.BODY}:300,400,500`]
            },
        })
    }
}
