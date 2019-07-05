import { Box, Paper } from "@material-ui/core"
import * as firebase from "firebase/app"
import "firebase/auth"
import * as firebaseui from "firebaseui"
import * as React from "react"
import { Routes } from "../routing/Routes"

const baseUrl = window.location.origin

const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: `${baseUrl}/${Routes.lobby}`,
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: baseUrl,
    // Privacy policy url/callback.
    privacyPolicyUrl: function () {
        window.location.assign(baseUrl)
    }
}

export class LoginOrSignup extends React.Component {

    componentDidMount(): void {
        // Initialize the FirebaseUI Widget using Firebase.
        const ui = new firebaseui.auth.AuthUI(firebase.auth())
        // The start method will wait until the DOM is loaded.

        ui.start("#login-or-signup", uiConfig)
    }

    render() {
        return (
            <div style={{display: "flex", justifyContent: "center"}}>
                <Paper>
                    <Box py={2} px={1}>
                        <div id={"login-or-signup"}/>
                    </Box>
                </Paper>
            </div>
        )
    }
}
