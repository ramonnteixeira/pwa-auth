import { SignInResult } from "./signin-result";
import { SignInProvider } from "./signin-provider";
export declare class GoogleProvider implements SignInProvider {
    private clientId;
    private clientSecret;
    static readonly apiUrl = "https://apis.google.com/js/api:client.js";
    constructor(clientId: string, clientSecret: string);
    signIn(): Promise<SignInResult>;
    loadDependencies(): Promise<void>;
}
