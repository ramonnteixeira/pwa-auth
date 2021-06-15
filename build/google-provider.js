export class GoogleProvider {
    constructor(clientId) {
        this.clientId = clientId;
    }
    signIn() {
        return this.loadDependencies()
            .then(() => this.signInWithGoogleAuth2());
    }
    loadDependencies() {
        return this.appendGoogleScript()
            .then(() => this.loadAuth());
    }
    appendGoogleScript() {
        var _a;
        const gapiLoad = (_a = window.gapi) === null || _a === void 0 ? void 0 : _a.load;
        if (!gapiLoad) {
            return new Promise((resolve, reject) => {
                const scriptEl = window.document.createElement("script");
                scriptEl.async = true;
                scriptEl.src = GoogleProvider.apiUrl;
                scriptEl.onload = () => resolve();
                scriptEl.onerror = (error) => reject({ message: "Error loading Google Platform library", error: error });
                window.document.head.appendChild(scriptEl);
            });
        }
        // GApi is already loaded.
        return Promise.resolve();
    }
    loadAuth() {
        if (!window.gapi || !window.gapi.load) {
            return Promise.reject("Couldn't find gapi.load");
        }
        // If we already have auth2, cool, we're done.
        if (window.gapi.auth2) {
            return Promise.resolve();
        }
        // Otherwise, pull in auth2.
        return new Promise(resolve => window.gapi.load("auth2", () => resolve()));
    }
    signInWithGoogleAuth2() {
        if (!(gapi === null || gapi === void 0 ? void 0 : gapi.auth2)) {
            return Promise.reject("gapi.auth2 wasn't loaded");
        }
        const auth = gapi.auth2.init({
            client_id: this.clientId,
            cookie_policy: "single_host_origin"
        });
        const self = this;
        return new Promise((resolve, reject) => {
            auth.then(function success() {
                // Speed through the process if we're already signed in.
                if (auth.isSignedIn.get()) {
                    const user = auth.currentUser.get();
                    return resolve(self.getSignInResultFromUser(user));
                }
                // Otherwise, kick off the OAuth flow.
                auth.signIn()
                    .then(user => resolve(self.getSignInResultFromUser(user)));
            }, function error(err) {
                console.log('error', err);
                reject(err);
            });
        });
    }
    getSignInResultFromUser(user) {
        const profile = user.getBasicProfile();
        const authResponse = user.getAuthResponse(true);
        return {
            email: profile.getEmail(),
            name: profile.getName(),
            imageUrl: profile.getImageUrl(),
            accessToken: authResponse === null || authResponse === void 0 ? void 0 : authResponse.access_token,
            accessTokenExpiration: new Date(authResponse.expires_at),
            provider: "Google",
            error: null,
            providerData: user
        };
    }
}
GoogleProvider.apiUrl = "https://apis.google.com/js/api:client.js";
//# sourceMappingURL=google-provider.js.map