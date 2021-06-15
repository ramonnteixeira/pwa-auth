import { LitElement } from 'lit-element';
import { SignInResult } from './signin-result';
import { ProviderInfo } from './provider-info';
export { SignInResult } from './signin-result';
export interface PwaAuth {
    appearance?: "button" | "list" | "none";
    signInButtonText?: string;
    microsoftButtonText?: string;
    googleButtonText?: string;
    facebookButtonText?: string;
    appleButtonText?: string;
    appleRedirectUri?: string | undefined | null;
    microsoftKey?: string | undefined | null;
    googleKey?: string | undefined | null;
    facebookKey?: string | undefined | null;
    appleKey?: string | undefined | null;
    credentialMode?: "none" | "silent" | "prompt";
    menuOpened?: boolean;
    menuPlacement?: "start" | "end";
    disabled?: boolean;
    iconLoading?: string;
    requireNewAccessToken?: boolean;
    signIn?: (providerName: ProviderName) => Promise<SignInResult>;
}
export declare type ProviderName = "Microsoft" | "Google" | "Facebook" | "Apple";
export declare class PwaAuthImpl extends LitElement implements PwaAuth {
    appearance: "button" | "list" | "none";
    signInButtonText: string;
    microsoftButtonText: string;
    googleButtonText: string;
    facebookButtonText: string;
    appleButtonText: string;
    appleRedirectUri: string | undefined | null;
    microsoftKey: string | undefined | null;
    googleKey: string | undefined | null;
    googleSecretKey: string | undefined | null;
    facebookKey: string | undefined | null;
    appleKey: string | undefined | null;
    credentialMode: "none" | "silent" | "prompt";
    menuOpened: boolean;
    menuPlacement: "start" | "end";
    disabled: boolean;
    iconLoading: "lazy" | "eager";
    requireNewAccessToken: boolean;
    readonly providers: ProviderInfo[];
    static readonly assetBaseUrl = "https://cdn.jsdelivr.net/npm/@pwabuilder/pwaauth@latest/assets";
    static readonly authTokenLocalStoragePrefix = "pwa-auth-token";
    static styles: import("lit-element").CSSResult;
    firstUpdated(): void;
    render(): unknown;
    /**
     * Starts the sign-in process using the specified provider.
     * @param providerName The name provider to sign-in with. Must be "Microsoft", "Google", "Facebook", or "Apple"
     */
    signIn(providerName: ProviderName): Promise<SignInResult>;
    private getMicrosoftIconUrl;
    private getGoogleIconUrl;
    private getFacebookIconUrl;
    private getAppleIconUrl;
    private renderLoginButton;
    private renderListButtons;
    private renderNoKeysError;
    private dropdownFocusOut;
    private get hasAnyKey();
    private signInClicked;
    private toggleMenu;
    private signInWithProvider;
    private signInCompleted;
    private importMicrosoftProvider;
    private importGoogleProvider;
    private importFacebookProvider;
    private importAppleProvider;
    private tryStoreCredential;
    private tryAutoSignIn;
    private trySignInWithStoredCredential;
    private getStoredCredential;
    private credentialToSignInResult;
    private getProviderNameFromUrl;
    private isWebKit;
    private loadAllDependencies;
    private tryUpdateStoredTokenInfo;
    private tryReadStoredTokenInfo;
    private getAuthTokenLocalStorageKeyName;
    private rehydrateAccessToken;
}
