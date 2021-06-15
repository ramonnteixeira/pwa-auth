export class GoogleProvider {
    constructor(clientId, clientSecret) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }
    async signIn() {
        try {
            const code = new URLSearchParams(window.location.search).get('code');
            const redirectUri = `${window.location.protocol}//${window.location.host}/`;
            if (code) {
                const res = await fetch('https://oauth2.googleapis.com/token', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        code,
                        client_id: this.clientId,
                        client_secret: this.clientSecret,
                        redirect_uri: redirectUri,
                        grant_type: "authorization_code"
                    })
                });
                const user = await res.json();
                return {
                    accessToken: user.access_token,
                    accessTokenExpiration: new Date(user.expires_at),
                    provider: "Google",
                    error: null,
                    providerData: user
                };
            }
            window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${this.clientId}&redirect_uri=${redirectUri}&scope=profile%20email`;
            return { provider: 'Google', error: { name: 'waiting response', message: 'waiting server response' } };
        }
        catch (error) {
            console.log(error);
            return { provider: 'Google', error: { name: 'Fail to google login', message: error.message } };
        }
    }
    loadDependencies() {
        return Promise.resolve();
    }
}
GoogleProvider.apiUrl = "https://apis.google.com/js/api:client.js";
//# sourceMappingURL=google-provider.js.map